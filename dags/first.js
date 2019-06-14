import WorkflowFactory from '../src/models/workflow-factory';
import Dag from '../src/models/dag';
import DummyOperator from '../src/operators/dummy';
import BashOperator from '../src/operators/bash';

export default class FirstWorkflowFactory extends WorkflowFactory {
  /* eslint class-methods-use-this: "off" */
  resolveInputs() {
    return {};
  }

  /* eslint class-methods-use-this: "off" */
  resolveDag() {
    const dag = new Dag();

    const start = new BashOperator(dag, 'start', {command: "echo 1234123123123123123123123123123"});
    const end = new DummyOperator(dag, 'end');

    end.addUpstreamTask(start);

    return dag;
  }
}
