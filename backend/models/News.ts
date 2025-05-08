import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: {
    type: {
      en: String,
      ru: String,
      kg: String,
    },
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  description: {
    type: {
      en: String,
      ru: String,
      kg: String,
    },
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const News = mongoose.model('News', NewsSchema);
export default News;
