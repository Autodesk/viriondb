import path from 'path';
import fs from 'fs';
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


//Static Files
app.use(express.static(pathContent));
app.use('/images', express.static(path.resolve(__dirname, '../src/images')));

app.use('/data', dataRouter);

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
