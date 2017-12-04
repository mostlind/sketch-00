import p5 from "p5";
import Agent from "./agent";
import Flock from "./flock";
import WP from "./webpackUpdateWorkerPool";
import AQ from "./asyncQueue";

const inspect = x => {
  console.log(x);
  return x;
};

const sketch = p => {
  const x = 100;
  const y = 100;
  const numAgents = 50;
  let flock = [];
  let updateWorkerPool;
  let lastFrameTime = Date.now();

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < numAgents; i++) {
      flock.push(Agent.create(p.random(0, p.width), p.random(0, p.height)));
    }

    updateWorkerPool = WP.create("worker.js");
  };

  p.draw = () => {
    p.background(225);

    Flock.runConcurrent(updateWorkerPool, p, flock).then(f => {
      flock = f;
    });

    // updateWorkerPool
    //   .post({
    //     flock,
    //     sketchData: { width: p.width, height: p.height }
    //   })
    //   .then(f => (flock = f));

    Flock.render(p, flock);

    console.log("fps", 1000 / (Date.now() - lastFrameTime));
    lastFrameTime = Date.now();
  };
};

new p5(sketch, document.querySelector("#sketch"));
