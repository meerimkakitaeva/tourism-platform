import mongoose from 'mongoose';

const MainSliderSchema = new mongoose.Schema({
  country: {
    en: String,
    ru: String,
    kg: String,
  },
  image: {
    type: String,
    required: true,
  },
});

const MainSlider = mongoose.model('MainSlider', MainSliderSchema);
export default MainSlider;
