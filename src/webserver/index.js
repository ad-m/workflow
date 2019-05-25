
import app from './app';
import persistence from '../persistence';


export default async function start(port = 8000) {
  await persistence.then(() => {
    console.log('Mongo connected');
  });
  app.listen(port, () => {
    /* eslint no-console: "off" */
    console.log(`Running on port ${port}...`);
  });
}
