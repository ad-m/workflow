import { Command, flags } from '@oclif/command';
import start from '../worker';
import DagRun from "../models/dag_run"
import OrchesterToolbox from "../orchester/toolbox"
import { createFactory } from '../loaders';
import TaskInstance from '../models/task_instance';

class TriggerDagCommand extends Command {
  static description = `Describe the command here
  ...
  Extra documentation goes here
  `

  static flags = {
    name: flags.string({ char: 'n', description: 'name to print' }),
  }

  static args = [
    {
      name: 'dag_name', 
      required: true
    }
  ]

  async run() {
    const { flags, args } = this.parse(TriggerDagCommand);
    console.log({flags, args})
    const {dag_name: DagName} = args
    const mongoose = await require('../persistence')
    this.log("Mongo connected")
    const dr = new DagRun({
      dag_name: DagName,
      start_date: new Date(),
      end_date: null
    })
    this.log("Created dagRun: +id=" + dr._id)
    await dr.save()
    const factory = await createFactory(DagName)
    const dag = factory.resolveDag()
    const taskInstances = await Promise.all(dag.tasks.map(async task => {
      const ti = TaskInstance({
        task_id: task.taskId,
        dag_run: dr._id,
        start_date: new Date()
      })
      await ti.save();     
      return ti
    }))
    this.log("Created " + taskInstances.length + " task instances") 

    const toolbox = new OrchesterToolbox(DagName, dr._id)
    await toolbox.queueStartingTasks()
  }
}

export default TriggerDagCommand;
