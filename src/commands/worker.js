import { Command, flags } from '@oclif/command';
import start from '../worker';

class HelloCommand extends Command {
  async run() {
    const { flagsCommand } = this.parse(HelloCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/worker.js`);

    await start();
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`;

HelloCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

export default HelloCommand;
