import Agent from "./agent";

const inspect = x => {
  console.log(x);
  return x;
};

const partitionArray = (arr, sections) => {
  let itemsPer = Math.floor(arr.length / sections) + 1;
  let newArr = [];
  let section;

  for (let i = 0; i < sections; i++) {
    section = [];
    for (let j = 0; j < itemsPer; j++) {
      if (arr.length <= 0) break;
      section.unshift(arr.pop());
    }
    newArr.unshift(section);
  }

  return newArr;
};

const Flock = {
  create: a => (Array.isArray(a) ? a : []),
  add: (flock, agent) => [...flock, agent],
  run: (p, flock) => flock.map(a => Agent.run(p, a)),
  render: (p, flock) => flock.map(a => Agent.render(p, a)),
  runConcurrent: (pool, { width, height }, flock) => {
    //return pool.post({ sketchData: { width, height }, agents: flock });
    let n = Date.now();
    return (
      Promise.all([
        pool.post({
          sketchData: { width, height },
          agents: flock.slice(0, 50)
        })
        // pool.post({
        //   sketchData: { width, height },
        //   agents: flock.slice(50, 100)
        // }),
        // pool.post({
        //   sketchData: { width, height },
        //   agents: flock.slice(100, 150)
        // }),
        // pool.post({
        //   sketchData: { width, height },
        //   agents: flock.slice(150, 200)
        // })
      ])
        //.then(([a, b, c, d]) => [...a, ...b, ...c, ...d]);
        .then(([a]) => a)
    );
    // return Promise.all(
    //   partitionArray(flock, pool.size).map(agents =>
    //     pool.post({ sketchData: { width, height }, agents })
    //   )
    // ).then(s => [].concat.apply([], s));
  }
};

export default Flock;
