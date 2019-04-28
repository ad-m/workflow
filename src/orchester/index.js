import { sleep } from '../utils';

export default async function start() {
  /* eslint no-constant-condition: "off" */
  while (true) {
    /* eslint no-await-in-loop: "off" */
    await sleep(5000);
    /* eslint no-console: "off" */
    console.log('Create a new task');
    const queue = require('../queue').default;
    const job = queue.create('task', {
      title: 'converting loki\'s to avi',
      user: 1,
      frames: 200,
    }).save((err) => {
      if (!err) console.log(job.id);
    });
  }
}
