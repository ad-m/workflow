import { Command, flags } from '@oclif/command';
import TaskInstance from "../models/task_instance";
import { findTask } from '../loaders';

class TaskCommand extends Command {
  async run() {
    const { flags: {
      'task-id': taskId,
      'dag-run-id': dagRunId,
    }} = this.parse(TaskCommand);

    const ti = await TaskInstance.findOne({
      task_id: taskId,
      dag_run: dagRunId
    }).populate('dag_run')

    const task = await findTask(ti.dag_run.dag_name, ti.task_id)
    await task.run(ti)
    process.exit(0)
  }
}

TaskCommand.description = `Describe the command here
...
Extra documentation goes here
`;

TaskCommand.flags = {
  'task-id': flags.string({ required: true }),
  'dag-run-id': flags.string({ required: true }),  
};

export default TaskCommand;
