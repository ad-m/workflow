import WorkflowFactory from '../src/models/workflow-factory';
import Dag from '../src/models/dag';
import DummyOperator from '../src/operators/dummy';

export default class SecondWorkflowFactory extends WorkflowFactory {
  /* eslint class-methods-use-this: "off" */
  resolveInputs() {
    return {};
  }

  /* eslint class-methods-use-this: "off" */
  resolveDag() {
    const dag = new Dag();

    const task1 = new DummyOperator(dag, 'task1');
    const task2 = Array(3).fill(0).map((_, i) => new DummyOperator(dag, `task2_${i}`))
    const task3 =  new DummyOperator(dag, 'task3')
    const task4 = Array(3).fill(0).map((_, i) => new DummyOperator(dag, `task4_${i}`))
    const task5 = new DummyOperator(dag, 'task5');

    task2.forEach(d => d.addUpstreamTask(task1))
    task2.forEach(d => task3.addUpstreamTask(d))
    
    task4.forEach(d => d.addUpstreamTask(task3))
    task5.addUpstreamTask(task4[0])
    task5.addUpstreamTask(task4[2])

    return dag;
  }
}
