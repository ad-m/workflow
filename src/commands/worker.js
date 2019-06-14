import { Command, flags } from '@oclif/command';
import start from '../worker';

class WorkerCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(WorkerCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/worker.js`);
    
    await start();
  }
}

WorkerCommand.description = `Describe the command here
...
Extra documentation goes here
`;

WorkerCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

export default WorkerCommand;
