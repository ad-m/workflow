export default class Dag {
  constructor() {
    this.tasks = []
  }

  addTask(task) {
    this.tasks.push(task)
  }

  getRelations() {
    return this.tasks
        .map(task => 
          task.upstreamTasks
            .map(d => ({to: task.taskId, from: d.taskId}))
        ).reduce((prev, curr) => ([...prev, ...curr]), [])
  }
}
