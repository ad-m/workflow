import _ from 'koa-route';
import home from './controllers/home';

export default (app) => {
  app.use(_.get('/', home.index));
};
