import Task from '../../models/task';

const home = {
  index: async (ctx) => {
    const task = new Task({
      name: 'x',
    });
    await task.save();
    await ctx.render('index', {
      title: 'DAGFlow',
      message: 'Hello World',
    });
  },
};
export default home;
