import renderTemplate from '../template';
import {TASK_INSTANCE_STATES} from "./task_instance"

export default class BaseOperator {
  constructor(dag, taskId, params = {}) {
    this.dag = dag;
    this.taskId = taskId;
    this.upstreamTasks = [];
    this.params = params;
    this.dag.addTask(this)
  }

  addUpstreamTask(task) {
    this.upstreamTasks.push(task);
  }

  resolveParams() {
    const renderedParams = {};
    Object.entries(this.params).forEach(([key, value]) => {
      renderedParams[key] = value
      // renderedParams[key] = renderTemplate(value, {
      //   task: this,
      //   dag: this.dag,
      // });
    });

    return renderedParams;
  }

  /* eslint class-methods-use-this: "off" */
  async run(taskInstance) {
    if (taskInstance.state != TASK_INSTANCE_STATES.RUNNING){
      throw Error("Invalid task instance state. You are trying to run a task that is not in the running state.")
    }
    this.params = this.resolveParams()
    await this.execute()
  }

  /* eslint class-methods-use-this: "off" */
  async execute() {
    throw new Error('Missing implementation');
  }
}
