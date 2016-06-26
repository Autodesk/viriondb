import run from './run';
import runServer from './runServer';
import setup from './setup';
import bundle from './bundle';
import clean from './clean';
import copy from './copy';

//This is a short term file which is used to build the client, and run the server once. Meant for short-term production use, getting rid of webpack middleware etc., but still running the server in babel-node.

async function startInstance() {
  await run(clean);
  await run(setup);
  await run(copy.bind(undefined, { watch: true }));
  await run(bundle);

  console.log('client built, starting server');
  await new Promise(resolve => {
    runServer(() => resolve);
  });
}

export default startInstance;
