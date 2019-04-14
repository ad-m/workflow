import { Command, flags } from '@oclif/command';
import start from '../webserver';

class HelloCommand extends Command {
  async run() {
    const { flagsCommand } = this.parse(HelloCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/webserver.js`);

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
