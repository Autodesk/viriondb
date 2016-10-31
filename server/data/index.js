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
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import data from '../../data/keyedData';

const router = express.Router(); //eslint-disable-line new-cap
const jsonParser = bodyParser.json({
  strict: false, //allow values other than arrays and objects,
  limit: 20 * 1024 * 1024,
});

router.use(compression());

router.route('/id/:ids')
  .all(jsonParser)
  .get((req, res, next) => {
    if (!req.params.ids) {
      res.status(404).send();
    }

    const ids = req.params.ids.split(',');
    const retrieved = ids.map(id => data[id]);

    if (!retrieved.every(obj => !!obj) || req.params.ids.length === 0) {
      return res.status(404).send();
    }

    res.json(retrieved.reduce((acc, item) => Object.assign(acc, { [item.id]: item }), {}));
  });

router.get('/all', (req, res, next) => {
  res.json(data);
});

//default catch
router.use('*', (req, res) => {
  res.status(404).send('error');
});

export default router;
