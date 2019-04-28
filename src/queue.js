import kue from 'kue';
import { REDIS_URL } from './config';

const queue = kue.createQueue({
  redis: REDIS_URL,
});

console.log(`REDIS_URL = ${REDIS_URL}`);

export default queue;
