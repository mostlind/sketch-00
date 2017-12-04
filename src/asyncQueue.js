const queue = ({ queue, waiting }) => ({
  enqueue: x => {
    waiting.length > 0 ? waiting.shift()(x) : queue.unshift(x);
    return;
  },
  dequeue: async () =>
    queue.length > 0
      ? queue.shift()
      : new Promise((resolve, reject) => {
          waiting.unshift(resolve);
        })
});

const create = () => queue({ queue: [], waiting: [] });
const from = arr => queue({ queue: arr, waiting: [] });

export default {
  create,
  from
};
