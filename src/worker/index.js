import { execFile } from 'mz/child_process';
import TaskInstance, {TASK_INSTANCE_STATES} from "../models/task_instance";
import { findTask } from '../loaders';
import { sleep } from '../utils';

const debug = require('debug')('app:worker')

export default async function start() {
  debug("Starting worker")
  const queue = require('../queues')
  const workerQueue = queue.worker;
  const orchesterQueue = queue.orchester;
  workerQueue.process('new-task', async (job, done) => {
    const { 
      data: {
        dag_run_id: dagRunId, 
        task_id: taskId
      } 
    } = job;
    await require('../persistence')
    debug("New task: dagRunId=%s, taskId=%s", dagRunId, taskId)
    const ti = await TaskInstance.findOne({
      task_id: taskId,
      dag_run: dagRunId
    });
    debug("Found task instance: _id=", ti._id)
    ti.state = TASK_INSTANCE_STATES.RUNNING
    ti.save()
    debug("Changed task state: %s", ti.state)
    try {
      const execPath = process.execPath
      const command = ti.getCommand()
      // await sleep(Math.random() * 5000)
      debug("Starting command: execPath=%s, command=%o", execPath, command)
      const stdout = await execFile(execPath, command)
      console.log(stdout)
      ti.state = TASK_INSTANCE_STATES.SUCCESS
      await ti.save()
      debug("Changed task state: %s", ti.state)
    } catch (ex){
      debug("Task execution error, %s", ex)
      ti.state = TASK_INSTANCE_STATES.FAILED
      await ti.save()
      debug("Changed task state: %s", ti.state)
    }
    await queue.createJob(orchesterQueue, 'queue-available-tasks', {
      dag_run_id: dagRunId, 
      task_id: taskId 
    })
    done()
  });

  process.once('uncaughtException', (err) => {
    console.error('Something bad happened: ', err);
    workerQueue.shutdown(1000, (err2) => {
      console.error('Kue shutdown result: ', err2 || 'OK');
      process.exit(0);
    });
  });
}
