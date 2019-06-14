import { Command, flags } from '@oclif/command';
import start from '../orchester';

class OrchesterCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(OrchesterCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/orchester.js`);

    await start();
  }
}

OrchesterCommand.description = `Describe the command here
...
Extra documentation goes here
`;

OrchesterCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

export default OrchesterCommand;
