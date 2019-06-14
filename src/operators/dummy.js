import BaseOperator from '../models/operator';

export default class DummyOperator extends BaseOperator {
  /* eslint class-methods-use-this: "off", no-console: "off" */
  async execute() {
    console.log('Do nothing');
  }
}
