import BaseOperator from '../models/operator';
import { execFile } from 'mz/child_process';

export default class BashOperator extends BaseOperator {
  
  async execute() {
    const [stdout, etderr] = await execFile("bash", ["-c", this.params.command])
    console.log({stdout, etderr})
  }
}
