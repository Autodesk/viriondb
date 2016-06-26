import del from 'del';
import { makeDir } from './lib/fs';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await del(['.tmp', 'build/*', '!build/.git'], { dot: true });
  await makeDir('build/public');
}

export default clean;
