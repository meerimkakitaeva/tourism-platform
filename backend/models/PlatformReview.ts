import mongoose from 'mongoose';
import User from './User';

const PlatformReviewSchema = new mongoose.Schema({
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
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const PlatformReview = mongoose.model('PlatformReview', PlatformReviewSchema);
export default PlatformReview;
