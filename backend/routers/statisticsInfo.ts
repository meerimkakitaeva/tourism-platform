import express from 'express';
import StatisticsInfo from '../models/StatisticsInfo';

const statisticsInfoRouter = express.Router();

statisticsInfoRouter.get('/', async (req, res) => {
  try {
    const info = await StatisticsInfo.findOne();
    return res.send(info);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

export default statisticsInfoRouter;
