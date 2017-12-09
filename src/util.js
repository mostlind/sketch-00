export const assign = (target, obj) => {
  for (let key in obj) {
    target[key] = obj[key];
  }

  return target;
};
