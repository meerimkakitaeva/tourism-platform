import express from 'express';
import mongoose from 'mongoose';
import TourRating from '../models/TourRating';

const tourRatingRouter = express.Router();

tourRatingRouter.get('/', async (req, res) => {
  try {
    if (req.query.tourID) {
      const rating = await TourRating.find({
        tour: req.query.tourID,
      }).populate('user tour');
      return res.send(rating);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

tourRatingRouter.post('/', async (req, res, next) => {
  try {
    const rating = new TourRating({
      user: req.body.user,
      tour: req.body.tour ? req.body.tour : null,
      rating: req.body.rating,
    });

    await rating.save();
    return res.send(rating);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default tourRatingRouter;
