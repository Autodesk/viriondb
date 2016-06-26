import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router(); //eslint-disable-line new-cap
const jsonParser = bodyParser.json({
  strict: false, //allow values other than arrays and objects,
  limit: 20 * 1024 * 1024,
});

router.route('/:route')
  .get((req, res, next) => {
    res.send('yay')
  });

//default catch
router.use('*', (req, res) => {
  res.status(404).send('error');
});

export default router;
