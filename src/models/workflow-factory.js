
export default class WorkflowFactory {
  /* eslint class-methods-use-this: "off" */
  resolveInputs() {
    return [];
  }

  /* eslint class-methods-use-this: "off", no-unused-vars: "off" */
  resolveDag(inputData) {
    throw Error('Please ovveride method `resolve`.');
  }
}
