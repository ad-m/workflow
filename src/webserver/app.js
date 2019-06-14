import path from 'path';

import Koa from 'koa';
import koaEjs from 'koa-ejs';
import logger from 'koa-logger'

import routes from './routes';

const app = new Koa();

if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}

routes(app);

koaEjs(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});

export default app;
