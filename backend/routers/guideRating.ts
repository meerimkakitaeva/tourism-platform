import express from 'express';
import mongoose from 'mongoose';
import GuideRating from '../models/GuideRating';

const guideRatingRouter = express.Router();

guideRatingRouter.get('/', async (req, res) => {
  try {
    const rating = await GuideRating.find({
      guide: req.query.guideID,
    }).populate('user guide');
    return res.send(rating);
  } catch (e) {
    return res.status(500).send(e);
  }
});

guideRatingRouter.post('/', async (req, res, next) => {
  try {
    const rating = new GuideRating({
      user: req.body.user,
      guide: req.body.guide ? req.body.guide : null,
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

export default guideRatingRouter;
