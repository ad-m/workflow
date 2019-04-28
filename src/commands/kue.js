import { Command, flags } from '@oclif/command';


class HelloCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(HelloCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/kue.js`);
    require('../queue');

    require('kue').app.listen(8000, () => {
      /* eslint no-console: "off" */
      console.log('Running on port 8000...');
    });
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
