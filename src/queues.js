import kue from 'kue';
import { REDIS_URL } from './config';

const debug = require('debug')('app:queues')

export const worker = kue.createQueue({
  prefix: 'worker',
  redis: REDIS_URL,
});

export const orchester = kue.createQueue({
  prefix: 'orchester',
  redis: REDIS_URL,
});

export function createJob(queue, type, data) {
  return new Promise((resolve, reject) => {
    debug("createJob: queue=%s, type=%s, data=%o", queue.prefix, type, data)
    queue.create(type, data).save((err) => {
      if (err) return reject(err);                
      return resolve()
    });
  })
} 