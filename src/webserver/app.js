import path from 'path';

import Koa from 'koa';
import koaEjs from 'koa-ejs';

import routes from './routes';

const app = new Koa();

koaEjs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

routes(app);

export default app;
