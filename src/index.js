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
  const numAgents = 225;
  let flock = [];
  let updateWorkerPool;
  let lastFrameTime = Date.now();

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < numAgents; i++) {
      flock.push(Agent.create(p.random(0, p.width), p.random(0, p.height)));
    }
  };

  p.draw = () => {
    p.background(235);

    p.fill(Agent.fill);
    p.stroke(Agent.stroke);
    p.strokeWeight(Agent.strokeWeight);
    flock = Flock.run(p, flock);
    Flock.render(p, flock);
  };
};

new p5(sketch, document.querySelector("#sketch"));
