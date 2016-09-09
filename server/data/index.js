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
