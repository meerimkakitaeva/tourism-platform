import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  title: {
    en: String,
    ru: String,
    kg: String,
  },
  description: {
    en: String,
    ru: String,
    kg: String,
  },
  image: String,
});

const AboutUsSchema = new mongoose.Schema({
  main: BlockSchema,
  offer: BlockSchema,
  posts: [BlockSchema],
  review: BlockSchema,
});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);

export default AboutUs;
