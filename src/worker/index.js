import { execFile } from 'mz/child_process';

export default function start() {
  const queue = require('../queue').default;
  queue.process('task', (job, done) => {
    const { type, data } = job;
    console.log('New task', { type, data });

    execFile(process.execPath, [process.mainModule.filename, 'task']).then((stdout) => {
      console.log(stdout);
    }).finally(() => done());
  });

  process.once('uncaughtException', (err) => {
    console.error('Something bad happened: ', err);
    queue.shutdown(1000, (err2) => {
      console.error('Kue shutdown result: ', err2 || 'OK');
      process.exit(0);
    });
  });
}
