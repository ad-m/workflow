const home = {
  index: async (ctx) => {
    await ctx.render('index', {
      title: 'DAGFlow',
      message: 'Hello World',
    });
  },
};
export default home;
