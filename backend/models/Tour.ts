import mongoose, { Model } from 'mongoose';
import { ITour } from '../type';

export interface ITourMethods extends ITour {
  checkDiscountPrice(discountPrice: number): boolean;
}

type TourModel = Model<ITour, NonNullable<unknown>, ITourMethods>;

const TourSchema = new mongoose.Schema({
  guides: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Guide',
      required: true,
    },
  ],
  name: {
    kg: String,
    ru: String,
    en: String,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    kg: String,
    ru: String,
    en: String,
  },
  category: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    min: [1, 'Min discountPrice is 1'],
    default: null,
  },
  duration: {
    type: Number,
    required: true,
  },
  plan: {
    type: [
      {
        title: {
          kg: String,
          ru: String,
          en: String,
        },
        planDescription: {
          kg: String,
          ru: String,
          en: String,
        },
      },
    ],
    required: true,
  },
  destination: {
    en: String,
    ru: String,
    kg: String,
  },
  arrival: {
    en: String,
    ru: String,
    kg: String,
  },
  departure: {
    en: String,
    ru: String,
    kg: String,
  },
  dressCode: {
    en: String,
    ru: String,
    kg: String,
  },
  included: {
    en: [String],
    ru: [String],
    kg: [String],
  },
  galleryTour: {
    type: [String],
    required: true,
  },
  country: {
    en: String,
    ru: String,
    kg: String,
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
  date: String,
  map: {
    type: String,
    required: true,
  },
  mapLink: {
    type: String,
    required: true,
  },
});

TourSchema.methods.checkDiscountPrice = function (discountPrice: number) {
  return discountPrice >= this.price;
};

const Tour = mongoose.model<ITour, TourModel>('Tour', TourSchema);
export default Tour;
