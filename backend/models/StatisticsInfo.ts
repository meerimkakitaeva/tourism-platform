import mongoose from 'mongoose';

const StatisticsInfoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
  },
});

const StatisticsInfo = mongoose.model('StatisticsInfo', StatisticsInfoSchema);
export default StatisticsInfo;
