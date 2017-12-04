const Vec2 = {
  create: (x, y) => ({ x, y }),

  // add two vectors
  add: (v1, v2) => ({ x: v1.x + v2.x, y: v1.y + v2.y }),

  // multiply a vector and a scalar
  mult: ({ x, y }, s) => ({ x: x * s, y: y * s }),

  // get random unit vector
  rand: () => {
    const r = Math.random();
    const xdir = Math.random() > 0.5 ? -1 : 1;
    const ydir = Math.random() > 0.5 ? -1 : 1;
    return { x: r * xdir, y: (1 - r) * ydir };
  }
};

export default Vec2;
