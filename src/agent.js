import Vec2 from "./vec2";

const Agent = {
  create: (x, y) => ({
    rad: 7.5,
    border: 2,
    acc: Vec2.create(0, 0),
    vel: Vec2.mult(Vec2.rand(), 4),
    pos: Vec2.create(x, y),
    r: 3.0,
    maxspeed: 3,
    maxForce: 0.5
  }),
  update: ({ pos, vel, acc, ...rest }) => ({
    vel: Vec2.add(vel, acc),
    pos: Vec2.add(pos, vel),
    acc: Vec2.mult(acc, 0),
    ...rest
  }),
  borders: (p, { vel, pos, ...rest }) => {
    let x = vel.x;
    let y = vel.y;
    let offset = rest.rad + rest.border;

    if (pos.x <= 0 + offset) {
      x = Math.abs(x);
    }

    if (pos.x >= p.width - offset) {
      x = -Math.abs(x);
    }

    if (pos.y <= 0 + offset) {
      y = Math.abs(y);
    }

    if (pos.y >= p.height - offset) {
      y = -Math.abs(y);
    }

    return {
      pos,
      vel: Vec2.create(x, y),
      ...rest
    };
  },
  render: (p, { pos, rad, border, ...rest }) => {
    p.fill(150);
    p.strokeWeight(border);
    p.stroke(60);
    p.ellipse(pos.x, pos.y, rad * 2);

    return {
      pos,
      rad,
      border,
      ...rest
    };
  },
  run: (p, agent) => Agent.borders(p, Agent.update(agent))
};

export default Agent;
