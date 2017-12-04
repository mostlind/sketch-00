import Agent from "./agent";

const inspect = x => {
  console.log(x);
  return x;
};

onmessage = ({ data: { sketchData, agents } }) =>
  postMessage(agents.map(a => Agent.run(sketchData, a)));
