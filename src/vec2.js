const Vec2 = {
  create: (x, y) => ({ x, y }),

  // add two vectors
  add: (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y }),

  // subtract two vectors
  sub: (v1, v2) => ({ x: v1.x - v2.x, y: v1.y - v2.y }),

  // multiply a vector and a scalar
  mult: (v, s) => ({ x: v.x * s, y: v.y * s }),

  // get random unit vector
  rand: () => {
    const r = Math.random();
    const xdir = Math.random() > 0.5 ? -1 : 1;
    const ydir = Math.random() > 0.5 ? -1 : 1;
    return { x: r * xdir, y: (1 - r) * ydir };
  },

  unit: v => {
    let mag = Vec2.mag(v);
    return { x: v.x / mag, y: v.y / mag };
  },

  // magnitude squared
  magSq: ({ x, y }) => x ** 2 + y ** 2,

  // magnitude
  mag: v => Math.sqrt(Vec2.magSq(v)),

  // set magnitude
  setMag: (v, mag) => Vec2.mult(Vec2.unit(v), mag),

  // cap magnitude
  capMag: (v, mag) => (Vec2.mag(v) > mag ? Vec2.setMag(v, mag) : v)
};

export default Vec2;
