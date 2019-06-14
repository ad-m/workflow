import mongoose from 'mongoose';

export const TASK_INSTANCE_STATES = {
  NO_STATUS: 'no status',
  QUEUED: 'queued',
  RUNNING: 'running',
  FAILED: 'failed',
  SUCCESS: 'success',
};

const TaskInstanceSchema = new mongoose.Schema({
  task_id: String,
  dag_run: {type: mongoose.Schema.Types.ObjectId, ref: 'DagRun'},
  start_date: Date,
  end_date: Date,
  state: {type: String, default: TASK_INSTANCE_STATES.NO_STATUS}
})

TaskInstanceSchema.methods.getCommand = function() {
  return [
    process.mainModule.filename,
    "task",
    "--task-id", this.task_id,
    "--dag-run-id", this.dag_run._id,
  ]
}

const TaskInstance = mongoose.model('TaskInstance', TaskInstanceSchema);

export default TaskInstance
