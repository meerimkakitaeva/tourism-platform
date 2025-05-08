import mongoose from 'mongoose';
import User from './User';

const GuideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await User.findById(value),
      message: 'User does not exist!',
    },
  },
  description: {
    kg: String,
    ru: String,
    en: String,
  },
  languages: {
    en: [String],
    ru: [String],
    kg: [String],
  },
  country: {
    en: String,
    ru: String,
    kg: String,
  },
  image: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  rating: {
    type: Number,
    default: 5,
  },
});

const Guide = mongoose.model('Guide', GuideSchema);
export default Guide;
