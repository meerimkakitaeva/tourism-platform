import mongoose from 'mongoose';
import User from './User';
import Guide from './Guide';
import Tour from './Tour';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        value === null ? true : await User.findById(value),
      message: 'User does not exist!',
    },
  },
  guide: {
    type: mongoose.Types.ObjectId,
    ref: 'Guide',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Guide.findById(value),
      message: 'Guide does not exist!',
    },
  },
  tour: {
    type: mongoose.Types.ObjectId,
    ref: 'Tour',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) =>
        await Tour.findById(value),
      message: 'Tour does not exist!',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  datetime: {
    type: String,
    default: new Date().toISOString(),
  },
  status: {
    type: String,
    required: true,
    default: 'booked',
    enum: ['booked', 'being considered', 'approved'],
  },
  isSendEmail: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
