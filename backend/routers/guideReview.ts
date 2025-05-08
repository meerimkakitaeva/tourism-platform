import express from 'express';
import mongoose from 'mongoose';
import GuideReview from '../models/GuideReview';

const guideReviewRouter = express.Router();

guideReviewRouter.get('/', async (req, res) => {
  try {
    if (req.query.guideID) {
      const reviews = await GuideReview.find({
        guide: req.query.guideID,
      }).populate('user guide');
      return res.send(reviews);
    }
    const reviews = await GuideReview.find().populate('user guide');
    return res.send(reviews);
  } catch (e) {
    return res.status(500).send(e);
  }
});

guideReviewRouter.post('/', async (req, res, next) => {
  try {
    const review = new GuideReview({
      user: req.body.user,
      guide: req.body.guide ? req.body.guide : null,
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

export default guideReviewRouter;
