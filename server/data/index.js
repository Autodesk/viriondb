import express from 'express';
import bodyParser from 'body-parser';

import data from '../../data/testSet';

const router = express.Router(); //eslint-disable-line new-cap
const jsonParser = bodyParser.json({
  strict: false, //allow values other than arrays and objects,
  limit: 20 * 1024 * 1024,
});

router.route('/id/:id')
  .all(jsonParser)
  .get((req, res, next) => {
    const object = data[req.params.id];
    if (!object || !req.params.id) {
      return res.status(404).send();
    }
    res.json(object);
  });

router.get('/all', (req, res, next) => {
  res.json(data);
});

//default catch
router.use('*', (req, res) => {
  res.status(404).send('error');
});

export default router;
