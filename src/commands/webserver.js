import { Command, flags } from '@oclif/command';
import start from '../webserver';

class WebserverCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(WebserverCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/webserver.js`);

    await start();
  }
}

WebserverCommand.description = `Describe the command here
...
Extra documentation goes here
`;

WebserverCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

export default WebserverCommand;
