/*
 Copyright 2016 Autodesk,Inc.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
import path from 'path';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import dataRouter from './data/index';

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;
const hostname = '0.0.0.0';

//create server app
const app = express();

const pathContent = '../src/public';
const pathClientBundle = '../build/client.js';

//use large body limit at root so that 100kb default doesnt propagate / block downstream
app.use(bodyParser.json({
  limit: '50mb',
  strict: false,
}));

//HTTP logging middleware
app.use(morgan('dev', {
  skip: (req, res) => req.path.indexOf('browser-sync') >= 0 || req.path.indexOf('__webpack') >= 0,
}));

app.use(compression());

//Static Files
app.use(express.static(pathContent));
app.use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.use('/data', dataRouter);

// for deployment verification
app.use(require('./version'));

app.get('*', (req, res) => {
  if (req.url.indexOf('client.js') >= 0) {
    //should only hit this when proxy is not set up (i.e. not in development)
    res.sendFile(path.resolve(__dirname, pathClientBundle));
  } else {
    //so that any routing is delegated to the client
    res.sendFile(path.resolve(__dirname, pathContent + '/index.html'));
  }
});

/*** running ***/

app.listen(port, hostname, (err) => {
  if (err) {
    console.log('error listening!', err.stack);
    return;
  }

  /* eslint-disable no-console */
  console.log(`Server listening at http://${hostname}:${port}/`);
});
