import mongoose, { HydratedDocument } from 'mongoose';
import User from './User';
import { IGuideRating } from '../type';

const GuideRatingSchema = new mongoose.Schema<IGuideRating>({
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
  guide: {
    type: mongoose.Types.ObjectId,
    ref: 'Guide',
    validate: {
      validator: function (
        this: HydratedDocument<IGuideRating>,
        guide: mongoose.Types.ObjectId,
      ) {
        return !!guide;
      },
      message: 'Tour or guide is required',
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

const GuideRating = mongoose.model('GuideRating', GuideRatingSchema);
export default GuideRating;
