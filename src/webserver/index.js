
import app from './app';


export default async function start(port = 8000) {
  app.listen(port, () => {
    /* eslint no-console: "off" */
    console.log(`Running on port ${port}...`);
  });
}
