import express from 'express';
import mongoose from 'mongoose';
import PlatformReview from '../models/PlatformReview';

const platformReviewRouter = express.Router();

platformReviewRouter.get('/', async (req, res) => {
  try {
    if (req.query.limit) {
      const reviews = await PlatformReview.find()
        .populate('user', 'displayName avatar')
        .sort({ date: -1 })
        .limit(4);
      return res.send(reviews);
    }
    const reviews = await PlatformReview.find()
      .populate('user', 'displayName avatar')
      .sort({ date: -1 });
    return res.send(reviews);
  } catch (e) {
    return res.status(500).send(e);
  }
});

platformReviewRouter.post('/', async (req, res, next) => {
  try {
    const review = new PlatformReview({
      user: req.body.user,
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

export default platformReviewRouter;
