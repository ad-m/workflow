import WorkflowFactory from '../src/models/workflow-factory';
import Dag from '../src/models/dag';
import DummyOperator from '../src/operators/dummy';
import { CreateInstance, StopInstance, StartInstance, DeleteInstance } from '../src/operators/gcloud';
import { start } from 'repl';

export default class SecondWorkflowFactory extends WorkflowFactory {
  /* eslint class-methods-use-this: "off" */
  resolveInputs() {
    return {};
  }

  /* eslint class-methods-use-this: "off" */
  resolveDag() {
    const dag = new Dag();

    
    const create_instance = new CreateInstance(dag, 'create', {
      name: "awesome-dagflow-machine",
      zone: "europe-west3-c",
      tags: "http-server,https-server",
      machine_type: "f1-micro",
      image: "debian-9-stretch-v20190514",
      image_project: "debian-cloud"
    });

    const stop_instance = new StopInstance(dag, 'stop', {
      name: "awesome-dagflow-machine",
      zone: "europe-west3-c",
    });

    const start_instance = new StartInstance(dag, 'start', {
      name: "awesome-dagflow-machine",
      zone: "europe-west3-c",
    });

    const delete_instance = new DeleteInstance(dag, 'delete', {
      name: "awesome-dagflow-machine",
      zone: "europe-west3-c",
    });

    stop_instance.addUpstreamTask(create_instance)
    start_instance.addUpstreamTask(stop_instance)
    delete_instance.addUpstreamTask(start_instance)    

    return dag;
  }
}
