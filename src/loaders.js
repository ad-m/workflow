import fs from "mz/fs"
import { DAGS_FOLDER } from "./config"
import path from "path"

export async function loadFactory(name) {
  const dags = await fs.readdir(DAGS_FOLDER)
  if (dags.find(d => d == name)) {
    return new Error(`Unable to find the DAG: ${name}`)
  }
  const filePath = path.join(DAGS_FOLDER, name)
  const Factory = require(filePath).default
  return Factory
}

export async function createFactory(name) {
  const Factory = await loadFactory(name)
  // TODO: Caches?
  return new Factory()
}

export async function findTask(dagName, taskId) {
  const dag = (await createFactory(dagName)).resolveDag()
  const task = dag.tasks.find(d => d.taskId == taskId)
  if (!task) return new Error('cannot find that task');
  return task
}