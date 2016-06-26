import run from './run';

/**
 * Deploy the contents of the `/build` folder to a remote
 * server via Git. Example: `npm run deploy -- production`
 */
async function deploy() {
  console.error('deploy not set up');
  return;

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  process.argv.push('--release');
  await run(require('./build'));

 //todo - actually deploy it somewhere
}

export default deploy;
