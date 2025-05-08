import mongoose, { HydratedDocument } from 'mongoose';
import User from './User';
import { ITourRating } from '../type';

const TourRatingSchema = new mongoose.Schema<ITourRating>({
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
        this: HydratedDocument<ITourRating>,
        tour: mongoose.Types.ObjectId,
      ) {
        return !!tour;
      },
      message: 'Tour is required',
    },
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Too low'],
    max: 5,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const TourRating = mongoose.model('TourRating', TourRatingSchema);
export default TourRating;
