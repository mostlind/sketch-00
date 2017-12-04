import AQ from "./asyncQueue";

const PoolWorker = {
  create: jsPath => {
    const w = new Worker(jsPath);
    return {
      post: data => {
        w.postMessage(data);

        return new Promise((resolve, reject) => {
          w.onmessage = e => resolve(e.data);
        });
      }
    };
  }
};

export function create(jsPath) {
  const concurrency = navigator.hardwareConcurrency || 4;
  const workers = AQ.from(
    Array.from(new Array(concurrency), () => PoolWorker.create(jsPath))
  );

  return {
    post: async data => {
      let w = await workers.dequeue();
      let ret = await w.post(data);
      workers.enqueue(w);
      return ret;
    }
  };
}

export default {
  create
};
