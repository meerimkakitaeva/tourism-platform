import express from 'express';
import TourReview from '../models/TourReview';
import mongoose from 'mongoose';

const tourReviewRouter = express.Router();

tourReviewRouter.get('/', async (req, res) => {
  try {
    if (req.query.tourID) {
      const reviews = await TourReview.find({
        tour: req.query.tourID,
      }).populate('user tour');
      return res.send(reviews);
    }
    const reviews = await TourReview.find().populate('user tour');
    return res.send(reviews);
  } catch (e) {
    return res.status(500).send(e);
  }
});

tourReviewRouter.post('/', async (req, res, next) => {
  try {
    const review = new TourReview({
      user: req.body.user,
      tour: req.body.tour ? req.body.tour : null,
      comment: req.body.comment,
    });

    await review.save();
    return res.send(review);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default tourReviewRouter;
