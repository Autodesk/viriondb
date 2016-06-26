import { defaultUser } from '../server/auth/local';
import setupUserData from '../server/auth/userSetup';

/*
When developing locally, set up a project for the default user.
This is the same project that is included in new user's accounts.
Only need to run this once.
 */

async function setupUser() {
  await setupUserData(defaultUser);
}

export default setupUser;
