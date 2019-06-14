import mongoose from 'mongoose';

export const TASK_INSTANCE_STATES = {
  RUNNING: 'running',
  FINISHED: 'finished',
}

const DagRunSchema = new mongoose.Schema({
  dag_name: String,
  start_date: Date,
  end_date: Date,
  state: {type: String, default: TASK_INSTANCE_STATES.RUNNING}
})

const DagRun = mongoose.model('DagRun', DagRunSchema);
export default DagRun
