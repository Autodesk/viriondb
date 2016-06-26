/*
alternative to babel-node, we can use node directly and require babel this way, and it patches node so that it will essentially support our ES6 syntax.

Prefer this method to babel-node, as babel-node creates a new child process to handle execution. That child (which for us starts the server) does not get killed immediately / properly so the port remains in use, and subsequently trying to start the server errors.
*/

require('babel-core/register');
require('./server');
