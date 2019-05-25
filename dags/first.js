import WorkflowFactory from '../src/models/workflow-factory';
import Dag from '../src/models/dag';
import DummyOperator from '../src/operators/dummy';

export default class FirstWorkflowFactory extends WorkflowFactory {
  /* eslint class-methods-use-this: "off" */
  resolveInputs() {
    return {};
  }

  /* eslint class-methods-use-this: "off" */
  resolveDag() {
    const dag = new Dag();

    const start = new DummyOperator(dag, 'start');
    const end = new DummyOperator(dag, 'end');

    end.addUpstreamTask(start);

    return dag;
  }
}
