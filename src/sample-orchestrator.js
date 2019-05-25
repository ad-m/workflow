const STATES = {
  NO_STATUS: 'no status',
  QUEUED: 'queued',
  RUNNING: 'running',
  FAILED: 'failed',
  SUCCESS: 'success',
};

const tasksStates = {
  A1: STATES.NO_STATUS,
  A2: STATES.NO_STATUS,
  B1: STATES.NO_STATUS,
  B2: STATES.NO_STATUS,
  B3: STATES.NO_STATUS,
  C1: STATES.NO_STATUS,
  D1: STATES.NO_STATUS,
  D2: STATES.NO_STATUS,
  D3: STATES.NO_STATUS,
  E1: STATES.NO_STATUS,
};

const dagRelations = [
  ['A1', 'B1'],
  ['A1', 'B2'],
  ['A1', 'B3'],
  ['A2', 'B1'],
  ['B1', 'C1'],
  ['B2', 'C1'],
  ['B3', 'C1'],
  ['C1', 'D1'],
  ['C1', 'D2'],
  ['C1', 'D3'],
  ['D1', 'E1'],
  ['D3', 'E1'],
];

const tasks = Object.keys(tasksStates);

function findEndingTasks(allTasks) {
  const endingTasks = [];
  for (const task of allTasks) {
    if (dagRelations.filter(([start]) => start === task).length === 0) {
      endingTasks.push(task);
    }
  }
  return endingTasks;
}

function findStartingTasks(allTasks) {
  const endingTasks = [];
  for (const task of allTasks) {
    if (dagRelations.filter(([, end]) => end === task).length === 0) {
      endingTasks.push(task);
    }
  }
  return endingTasks;
}

console.log('startingTasks: ', findStartingTasks(tasks));
console.log('endingTasks: ', findEndingTasks(tasks));


function setState(task, newState) {
  tasksStates[task] = newState;
  console.log(`Set state of Task ${task} = ${newState}`);
}

findStartingTasks(tasks).forEach(d => setState(d, STATES.QUEUED));

function findRechableTasks(tasks) {
  const startingTasks = findStartingTasks(tasks);
  const rechableTasks = [];
  const visitedTask = [];
  function walk(currentTask) {
    if (visitedTask.includes(currentTask)) {
      return;
    }
    visitedTask.push(currentTask);
    const currentState = tasksStates[currentTask];
    rechableTasks.push(currentTask);
    if (currentState !== STATES.SUCCESS) {
      return;
    }
    const downstreamTasks = dagRelations
      .filter(([start, ]) => start === currentTask)
      .map(([, end]) => end);
    for (const task of downstreamTasks) {
      walk(task);
    }
  }
  startingTasks.forEach(walk);

  return rechableTasks;
}

function queueAvailableTasks() {
  const rechableTasks = findRechableTasks(tasks);
  const queuingTasks = rechableTasks
    .filter(d => tasksStates[d] === STATES.NO_STATUS)
    .filter((candidateTask) => {
      const upstreamTasks = dagRelations
        .filter(([, end]) => end === candidateTask)
        .map(([start]) => start);
      return upstreamTasks.every(d => tasksStates[d] === STATES.SUCCESS);
  });

  queuingTasks.forEach(d => setState(d, STATES.QUEUED));
}


queueAvailableTasks();
function simulate(iteration = 30) {
  for (let i = 0; i < iteration; i += 1) {
    console.log(`Loop iteration: ${i}`);
    const tasksInQueue = tasks
      .filter(d => [STATES.QUEUED, STATES.RUNNING].includes(tasksStates[d]));
    console.log('Task in queue:', tasksInQueue);
    if (tasksInQueue.length !== 0) {
      const selected_task = tasksInQueue[Math.floor(Math.random() * tasksInQueue.length)];
      const selectedTaskState = tasksStates[selected_task];
      if (selectedTaskState === STATES.RUNNING) {
        setState(selected_task, STATES.SUCCESS);
        queueAvailableTasks();
      } else if (selectedTaskState === STATES.QUEUED) {
        setState(selected_task, STATES.RUNNING);
      } else {
        console.log(`What should I do? ${selected_task} == ${selectedTaskState}`);
      }
    }
    const endingTasks = findEndingTasks(tasks);
    if (endingTasks.every(d => tasksStates[d] === STATES.SUCCESS)) {
      console.log('Finished DAG');
      break;
    }
    console.log(tasksStates);
  }
}
simulate();
