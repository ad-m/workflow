export const sleep = time => new Promise(resolve => setInterval(resolve, time));

export default {
  sleep,
};
