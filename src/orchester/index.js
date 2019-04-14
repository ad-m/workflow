import { sleep } from '../utils';

export default async function start() {
  /* eslint no-constant-condition: "off" */
  while (true) {
    /* eslint no-await-in-loop: "off" */
    await sleep(200);
    // console.log('I do someting');
  }
}
