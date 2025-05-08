import { ObjectId } from 'mongoose';

export interface IUser {
  _id: ObjectId;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  email: string;
  avatar?: string;
  appleID?: string;
  googleID?: string;
  verified: boolean;
}

export interface IGuide {
  _id: ObjectId;
  user: ObjectId;
  description: string;
  languages: string[];
  country: string;
  image: string;
  isPublished: boolean;
}

export interface ITour {
  _id: ObjectId;
  name: ILanguages;
  guides: IGuide[];
  mainImage: string;
  description: ILanguages;
  category: string[];
  price: number;
  discountPrice: number;
  duration: number;
  plan: [
    {
      title: ILanguages;
      planDescription: ILanguages;
      _id: ObjectId;
    },
  ];
  destination: ILanguages;
  arrival: ILanguages;
  departure: ILanguages;
  dressCode: ILanguages;
  included: ILanguagesArrayKey;
  galleryTour: string[];
  country: ILanguages;
  isPublished: boolean;
  rating: number;
  date: string;
  map: string;
  mapLink: string;
}

export interface ITourReview {
  user: ObjectId;
  tour: ObjectId;
  comment: string;
  date: string;
}

export interface ITourRating {
  user: ObjectId;
  tour: ObjectId;
  rating: number;
  date: string;
}

export interface IGuideReview {
  user: ObjectId;
  guide: ObjectId;
  comment: string;
  date: string;
}

export interface IGuideRating {
  user: ObjectId;
  guide: ObjectId;
  rating: number;
  date: string;
}

export interface IPartner {
  name: string;
  image: string;
  link: string;
}

export interface IAboutUsBlock {
  title: ILanguages;
  description?: ILanguages;
  image?: string;
}

export interface ILanguages {
  en: string;
  ru: string;
  kg: string;
}

export interface ILanguagesArrayKey {
  en: string[];
  ru: string[];
  kg: string[];
}
