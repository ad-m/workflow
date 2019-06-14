import _ from 'koa-route';
import home from './controllers/home';
import api from './controllers/api';

export default (app) => {
  app.use(_.get('/', home.index));
  app.use(_.get('/api/dags/', api.dags_list))
  app.use(_.get('/api/dags/:dag_name', api.dags_retrive))
  app.use(_.get('/api/dags/:dag_name/tasks/:task_id', api.dags_tasks_retrive))
};
