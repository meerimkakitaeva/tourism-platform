import mongoose from 'mongoose';

const StatisticsSchema = new mongoose.Schema({
  allGuides: {
    type: Number,
    required: true,
  },
  allTours: {
    type: Number,
    required: true,
  },
  publishedTours: {
    type: Number,
    required: true,
  },
  unpublishedTours: {
    type: Number,
    required: true,
  },
  guidesBid: {
    type: Number,
    required: true,
  },
  guidesApproved: {
    type: Number,
    required: true,
  },

  allUsers: {
    type: Number,
    required: true,
  },
  allModerators: {
    type: Number,
    required: true,
  },

  allPartners: {
    type: Number,
    required: true,
  },

  allNews: {
    type: Number,
    required: true,
  },
  publishedNews: {
    type: Number,
    required: true,
  },
  unpublishedNews: {
    type: Number,
    required: true,
  },
  allEmployee: {
    type: Number,
    required: true,
  },

  ordersBooked: {
    type: Number,
    required: true,
  },
  ordersConsiders: {
    type: Number,
    required: true,
  },
  ordersApproved: {
    type: Number,
    required: true,
  },
  partnerOrdersAll: {
    type: Number,
    required: true,
  },
  partnerOrdersApproved: {
    type: Number,
    required: true,
  },
  partnerOrdersPending: {
    type: Number,
    required: true,
  },
  totalGuideOrders: {
    type: Number,
    required: true,
  },
});

const Statistic = mongoose.model('Statistic', StatisticsSchema);
export default Statistic;
