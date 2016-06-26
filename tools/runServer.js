import cp from 'child_process';
import { serverConfig } from './webpack.config';

// Should match the text string used in `src/server.js/server.listen(...)`
const RUNNING_REGEXP = /Server listening at http:\/\/(.*?)\//;

let server;
const { output } = serverConfig;
const serverPath = './server/devServerBabel.js'; //for running with babel-node (unbunbled)
//const serverPath = path.join(output.path, output.filename); //todo - run bundled server

// Launch or restart the Node.js server
function runServer(cb) {
  function onStdOut(data) {
    const time = new Date().toTimeString();
    const match = data.toString('utf8').match(RUNNING_REGEXP);

    process.stderr.write(`${server.pid}`);
    process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stdout.write(data);

    if (match) {
      server.stdout.removeListener('data', onStdOut);
      server.stdout.on('data', x => process.stdout.write(x));
      if (cb) {
        cb(null, match[1]);
      }
    }
  }

  if (server) {
    console.log('server exists, killing');
    server.kill('SIGTERM');
  }

  server = cp.spawn('node', [serverPath], {
    env: Object.assign({ NODE_ENV: 'dev' }, process.env),
    silent: false,
  });

  server.stdout.on('data', onStdOut);
  server.stderr.on('data', x => {
    const time = new Date().toTimeString();
    process.stderr.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
    process.stderr.write(x);
  });
}

process.on('exit', () => {
  if (server) {
    console.log('killing server');
    server.kill('SIGTERM');
  }
});

export default runServer;
