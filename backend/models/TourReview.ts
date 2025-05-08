import mongoose, { HydratedDocument } from 'mongoose';
import User from './User';
import { ITourReview } from '../type';

const TourReviewSchema = new mongoose.Schema<ITourReview>({
  user: {
    type: String,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: 'User does not exist!',
    },
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
    validate: {
      validator: function (
        this: HydratedDocument<ITourReview>,
        tour: mongoose.Types.ObjectId,
      ) {
        return !!tour;
      },
      message: 'Tour is required',
    },
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const TourReview = mongoose.model('TourReview', TourReviewSchema);
export default TourReview;
