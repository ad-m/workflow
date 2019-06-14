import { Command, flags } from '@oclif/command';


class KueCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(KueCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/kue.js`);
    require('../queues');

    require('kue').app.listen(8000, () => {
      /* eslint no-console: "off" */
      console.log('Running on port 8000...');
    });
  }
}

KueCommand.description = `Describe the command here
...
Extra documentation goes here
`;

KueCommand.flags = {
  name: flags.string({ char: 'n', description: 'name to print' }),
};

export default KueCommand;
