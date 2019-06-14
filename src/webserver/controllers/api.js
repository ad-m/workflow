import {DAGS_FOLDER} from "../../config.js"
import fs from "mz/fs"
import path from "path"
import { createFactory, findTask } from "../../loaders";

const home = {
  dags_list: async (ctx) => {
    const dags = await fs.readdir(DAGS_FOLDER)

    ctx.body = {
      items: dags.map(name => ({ name }))
    }
  },
  dags_retrive: async (ctx, name) => {
    const factory = await createFactory(name)
    const inputs = factory.resolveInputs()
    const dag = factory.resolveDag()
    ctx.body = {
      name: dag_file,
      file_path: filePath,
      inputs,
      tasks: dag.tasks.map(d => ({ taskId: d.taskId })),
      relations: dag.getRelations()
    }
  },
  dags_tasks_retrive: async (ctx, dagName, taskId) => {
    const task = await findTask(dagName, taskId)
    ctx.body = {
      task_id: task.taskId,
      upstream_tasks: [task.upstreamTasks.map(d => ({task_id: d.taskId}))],
      params: task.params,
    }
  },
};

export default home;
