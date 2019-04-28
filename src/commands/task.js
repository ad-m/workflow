import { Command, flags } from '@oclif/command';

class HelloCommand extends Command {
  async run() {
    const { flags: flagsCommand } = this.parse(HelloCommand);
    const name = flagsCommand.name || 'world';
    this.log(`hello ${name} from ./src/commands/worker.js`);

    console.log('Running a task in isolated process');
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
