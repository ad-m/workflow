import { createFactory } from "../loaders";
import TaskInstance, {TASK_INSTANCE_STATES} from "../models/task_instance"
import {worker, createJob} from "../queues"

const debug = require('debug')('app:toolbox')

export default class OrchesterToolbox {
  constructor(dagName, dagRunId) {
    this.dagName = dagName
    this.dagRunId = dagRunId
  }

  _findEndingTasks() {
    const endingTasks = [];
    for (const taskId of this.taskIds) {
      if (!this.dagRelations.filter(({from}) => from === taskId)) {
        endingTasks.push(taskId);
      }
    }
    return endingTasks;
  }
  
  _findStartingTasks() {
    const endingTasks = [];
    for (const taskId of this.taskIds) {
      if (!this.dagRelations.find(({to}) => to === taskId)) {
        endingTasks.push(taskId);
      }
    }
    return endingTasks;
  }

  _findRechableTasks() {
    const startingTasks = this._findStartingTasks();
    const rechableTasks = [];
    const walk = currentTask => {
      if (rechableTasks.includes(currentTask)) {
        return;
      }
      rechableTasks.push(currentTask);
      const currentState = this.taskStates[currentTask];
      if (currentState !== TASK_INSTANCE_STATES.SUCCESS) {
        return;
      }
      const downstreamTasks = this.dagRelations
        .filter(({from}) => from === currentTask)
        .map(({to}) => to);
      for (const task of downstreamTasks) {
        walk(task);
      }
    }
    startingTasks.forEach(walk);
  
    return rechableTasks;
  }
  
  async _loadTaskAndRelations() {
    debug("Loading task and relations")
    const factory = await createFactory(this.dagName)
    this.dag = factory.resolveDag()
    this.taskIds = this.dag.tasks.map(d => d.taskId)
    debug("TaskIds: %j.", this.taskIds.join(", "))
    this.taskInstances = await TaskInstance.find({dag_run: this.dagRunId}).exec()
    debug("taskInstances.length: %s", this.taskInstances.length)
    this.dagRelations = this.dag.getRelations()
    debug("dagRelations.length: %d", this.dagRelations.length)
  }

  _loadtaskStates() {
    debug("Loading task states")
    this.taskStates =  []
    for(const ti of this.taskInstances) {
      this.taskStates[ti.task_id] = ti.state
    }
  }

  async _queueTasks(taskIds) {
    const queue = require("../queues")
    await Promise.all(taskIds.map(taskId => queue.createJob(queue.worker, 'new-task', {
      dag_run_id: this.dagRunId, 
      task_id: taskId 
    })))
  }

  async setState(taskId, state){
    debug("State change: taskId=%s, state=%s", taskId, state)
    await TaskInstance.findOneAndUpdate({dag_run: this.dagRunId, task_id: taskId}, {state})
  }

  async queueAvailableTasks() {
    await this._loadTaskAndRelations()
    await this._loadtaskStates()
    const rechableTasks = this._findRechableTasks();
    debug("Found reachable tasks: %s", rechableTasks.join(", "))
    const queuingTasks = rechableTasks
      .filter(taskId => this.taskStates[taskId] === TASK_INSTANCE_STATES.NO_STATUS)
      .filter((candidateTask) => {
        const upstreamTasks = this.dagRelations
          .filter(({to}) => to === candidateTask)
          .map(({from}) => from);
        debug("Task %s have upstram: %s", candidateTask, upstreamTasks.join(", "))
        return upstreamTasks.every(d => this.taskStates[d] === TASK_INSTANCE_STATES.SUCCESS);
      });
    debug("Found queuing Tasks: %s", queuingTasks.join(", "))
    await Promise.all(queuingTasks.map(taskId => this.queueTask(taskId)));
  }

  async queueTask(taskId) {
    debug("Queue task: task_id=%s", taskId)
    await this.setState(taskId, TASK_INSTANCE_STATES.QUEUED);
    await createJob(worker, 'new-task', {
      dag_run_id: this.dagRunId, 
      task_id: taskId
    })
  }

  async queueStartingTasks() {
    await this._loadTaskAndRelations()
    const startingTasks = await this._findStartingTasks()
    
    await Promise.all(startingTasks.map(taskId => this.queueTask(taskId)));
  }
}