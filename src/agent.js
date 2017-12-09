import Vec2 from "./vec2";
import { assign } from "./util";

const Agent = {
  maxVel: 8,
  maxForce: 2,
  rad: 4.5,
  fill: 150,
  stroke: 50,
  strokeWeight: 2,
  create: (x, y) => ({
    acc: Vec2.create(0, 0),
    vel: Vec2.mult(Vec2.rand(), 4),
    pos: Vec2.create(x, y)
  }),
  addForce: (a, force) => {
    const f = Vec2.capMag(force, Agent.maxForce);
    const acc = Vec2.add(a.acc, f);
    return assign(a, { acc });
  },
  update: ({ vel, pos, acc, ...rest }) => ({
    vel: Vec2.capMag(Vec2.add(vel, acc), Agent.maxVel),
    pos: Vec2.add(pos, vel),
    acc: Vec2.mult(acc, 0),
    ...rest
  }),
  borders: (p, a) => {
    let x = a.pos.x;
    let y = a.pos.y;

    if (a.pos.x <= 0) x = p.width;
    if (a.pos.x >= p.width) x = 0;
    if (a.pos.y <= 0) y = p.height;
    if (a.pos.y >= p.height) y = 0;

    return assign(a, {
      pos: Vec2.create(x, y)
    });
  },
  render: (p, a) => {
    p.ellipse(a.pos.x, a.pos.y, Agent.rad * 2);

    return a;
  },
  cohese: (a, v, amount, dist = Infinity) => {
    let toV = Vec2.sub(v, a.pos);
    let m2 = Vec2.magSq(toV);
    let f = Vec2.mult(toV, m2 === 0 ? 0 : amount / Vec2.magSq(toV));
    if (Vec2.mag(toV) > dist) return a;
    return Agent.addForce(a, f);
  },
  run: (p, agent, agents) => {
    let apply = (v, fn) => fn(v);
    let fns = [];
    let mouseCohesion = 500;
    let mouseCohesionDist = 300;
    let mouseRepulsion = -700;
    let mouseRepulsionDist = 0;
    let agentCohesion = 4;
    let agentCohesionDist = 60;
    let agentRepulsion = -5;
    let agnetRepulsionDist = 50;

    const followMouse = a => {
      let mouse = Vec2.create(p.mouseX, p.mouseY);
      if (!p.mouseIsPressed) return a;
      return Agent.cohese(a, mouse, mouseCohesion, mouseCohesionDist);
    };

    const avoidMouse = a => {
      let mouse = Vec2.create(p.mouseX, p.mouseY);
      if (!p.mouseIsPressed) return a;
      return Agent.cohese(a, mouse, mouseRepulsion, mouseRepulsionDist);
    };

    const coheseAgents = agent =>
      agents.reduce(
        (agent, other) =>
          Agent.cohese(agent, other.pos, agentCohesion, agentCohesionDist),
        agent
      );

    const repelAgents = a =>
      agents.reduce(
        (self, other) =>
          Agent.cohese(self, other.pos, agentRepulsion, agnetRepulsionDist),
        a
      );

    const moveWithNeighbors = a =>
      agents.reduce((self, other, _i, arr) => {
        if (Vec2.mag(Vec2.sub(other.pos, self.pos)) > 100) return a;
        return Agent.addForce(self, Vec2.mult(other.vel, 1 / arr.length));
      }, a);

    fns = [
      coheseAgents,
      repelAgents,
      followMouse,
      avoidMouse,
      moveWithNeighbors,
      a => Agent.borders(p, a),
      Agent.update
    ];

    return fns.reduce(apply, agent);
  }
};

export default Agent;
