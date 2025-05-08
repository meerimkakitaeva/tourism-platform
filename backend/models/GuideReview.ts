import mongoose, { HydratedDocument } from 'mongoose';
import User from './User';
import { IGuideReview } from '../type';

const GuideReviewSchema = new mongoose.Schema<IGuideReview>({
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
        this: HydratedDocument<IGuideReview>,
        guide: mongoose.Types.ObjectId,
      ) {
        return !!guide;
      },
      message: 'Tour or guide is required',
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

const GuideReview = mongoose.model('GuideReview', GuideReviewSchema);
export default GuideReview;
