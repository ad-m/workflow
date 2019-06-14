import { sleep } from '../utils';
import DagRun from '../models/dag_run';
import OrchesterToolbox from "./toolbox"

const debug = require('debug')('app:orchester')

export default async function start() {
  const queue = require('../queues')
  const workerQueue = queue.worker;
  const orchesterQueue = queue.orchester;
  workerQueue.process('queue-available-tasks', async (job, done) => {
    const { 
      type, 
      data: {
        dag_run_id: dagRunId, 
        task_id: taskId
      } 
    } = job;
    debug("New queue available task request: dagRunId=%s, taskId=%s", dagRunId, taskId)
    const DR = await DagRun.findOne({_id: dagRunId})
    debug("Found DagRun")
    const toolbox = new OrchesterToolbox(
      DR.dag_name,
      DR._id
    )
    await toolbox.queueAvailableTasks()
    debug("Successfull queueavailable tasks")
    done()
  })
}
