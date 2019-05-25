import renderTemplate from '../template';

export default class BaseOperator {
  construcotr(dag, taskId, params = {}) {
    this.dag = dag;
    this.taskId = taskId;
    this.upstreamTasks = [];
    this.params = params;
  }

  addUpstreamTask(task) {
    this.upstreamTasks.push(task);
  }

  resolveParams() {
    const renderedParams = {};
    Object.entries(this.params).forEach((key, value) => {
      renderedParams[key] = renderTemplate(value, {
        task: this,
        dag: this.dag,
      });
    });

    return renderedParams;
  }

  /* eslint class-methods-use-this: "off" */
  run() {

  }

  /* eslint class-methods-use-this: "off" */
  execute() {
    throw new Error('Missing implementation');
  }
}
