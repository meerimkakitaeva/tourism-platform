export interface signInMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  email: string;
  avatar: File | null;
}

export interface IEditProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  googleID: string;
  appleID: string;
  email: string;
  avatar: string | null;
}

export type TConfidentialUser = Omit<User, 'token'>;

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IGuide {
  _id: string;
  user: User;
  description: string;
  languages: string[];
  country: string;
  image: string;
  isPublished: boolean;
  rating: number;
}

export interface IGuideFull extends IGuide {
  user: TConfidentialUser;
}

export interface ITourRoute {
  coordinates: string;
  icon: { src: string; type: string };
  title: string;
  strokeColor: string;
  id: string;
}

export interface Tour {
  _id: string;
  guides: IGuide[];
  category: [];
  name: string;
  description: string;
  duration: number;
  plan: [{ title: string; planDescription: string; _id: string }];
  country: string;
  destination: string;
  arrival: string;
  departure: string;
  dressCode: string;
  included: [];
  galleryTour: [];
  mainImage: string;
  price: number;
  discountPrice: number;
  isPublished: boolean;
  rating: number;
  date: string;
  map: string;
  mapLink: string;
}

export interface TourFull extends Tour {
  guides: IGuideFull[];
}

export interface IPlan {
  title: string;
  planDescription: string;
}

export interface ITourMutation {
  guides: string[];
  category: string[];
  name: string;
  description: string;
  duration: number | string;
  plan: IPlan[];
  country: string;
  destination: string;
  arrival: string;
  departure: string;
  dressCode: string;
  included: string[];
  galleryTour: File[] | null;
  mainImage: File | null;
  price: number | string;
  discountPrice?: number;
  map: string;
  mapLink: string;
}

export interface ITourReview {
  user: string;
  tour: string | null;
  comment: string;
}

export interface ITourReview2 extends ITourReview {
  _id: string;
  date: string;
}

export interface IOrder {
  guide: string;
  tour: string;
  price: number;
  date: string;
  user?: string;
  email?: string;
  phone?: string;
}

export interface IOrderForm {
  guide: string;
  date: string;
  email?: string;
  phone?: string;
}

export interface ReviewOfTour {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  tour: string;
  comment: string;
  date: string;
}

export interface ReviewOfPlatform {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  comment: string;
  date: string;
}

export interface ReviewOfGuides {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  guide: string;
  comment: string;
  date: string;
}

export interface allReviews {
  _id: string;
  user: {
    _id: string;
    displayName: string;
    avatar: string;
  };
  comment: string;
  date: string;
  tour?: string;
  guide?: string;
}

export interface RatingOfTour {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  tour: string;
  rating: number;
  date: string;
}

export interface IAlert {
  message: string;
  type: string;
  id: string;
  visible: boolean;
  className: string;
}

export interface INews {
  _id: string;
  title: string;
  date: string;
  description: string;
  images: [string];
  category: [string];
  isPublished: boolean;
}

export interface IEmployee {
  _id: string;
  name: string;
  number: string;
  role: string;
  image: string;
}

export interface IOrder2 {
  _id: string;
  guide: {
    _id: string;
    user: {
      displayName: string;
      email: string;
    };
  };
  tour: {
    _id: string;
    name: string;
  };
  price: number;
  date: string;
  user?: {
    displayName: string;
    email: string;
  };
  email?: string;
  phone?: string;
  datetime: string;
  status: string;
  isSendEmail: boolean;
}

export interface IPartner {
  _id: string;
  name?: string;
  image?: string;
  link?: string;
}

export interface IPartnerMutation {
  name?: string;
  image?: File | null;
  link?: string;
}

export interface IPartnerAccept {
  name?: string;
  image?: string | null;
  link?: string;
}

export interface INewsMutation {
  title: string;
  description: string;
  category: string[];
  images: File[] | null;
}

export interface IEmployeeMutation {
  name: string;
  number: string;
  role: string;
  image: File | null;
}

export interface IMainSlider {
  _id: string;
  image: string;
  country: string;
}

export interface IMainSliderMutation {
  image: File | null;
  country: string;
}

export interface IAboutUsBlock {
  _id: string;
  title: string;
  description?: string;
  image?: string;
}

export interface IAboutUs {
  _id: string;
  main: IAboutUsBlock;
  offer: IAboutUsBlock;
  posts: IAboutUsBlock[];
  review: IAboutUsBlock;
}

export interface IContactInfo {
  _id?: string;
  country: string;
  address: string;
  phone: string;
}

export interface IContacts {
  _id: string;
  image: File | null;
  title: string;
  description: string;
  contact: IContactInfo[];
}

export interface IContactsMutation {
  title: string;
  description: string;
  image: File | null;
  contact: IContactInfo[];
}

export interface IContactsImageMutation {
  image: File | null;
}

export interface RatingOfGuide {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  tour: string;
  rating: number;
  date: string;
}

export interface IPostGuideRating {
  guide: string;
  rating: number;
  user: string;
}

export interface IPostGuideReview {
  guide: string;
  comment: string;
  user: string;
}

export interface ISendGuideRequest {
  user: {
    _id: string;
  };
  name: string;
  surname: string;
  number: string;
  message: string;
}

export interface ISendGuideRequestMutation {
  user: string | null;
  name: string;
  surname: string;
  number: string;
  message: string;
}

export interface IGuideRequest extends ISendGuideRequest {
  _id: string;
  status: string;
}

export interface ICreateGuide {
  user: {
    _id: string;
  };
  description: string;
  languages: string[];
  country: string;
  image: File | null;
}

export interface IEditGuide {
  id: string;
  description: string;
  country: string;
  languages: string[];
}

export interface ICreateGuideMutation {
  user: string | null;
  description: string;
  languages: string[];
  country: string;
  image: File | null;
}

export interface IStatisticsAdmin {
  toursPublished: number;
  toursUnpublished: number;
  toursAll: number;
  users: number;
  usersModerators: number;
  guidesAll: number;
  guidesPublished: number;
  guidesUnpublished: number;
  newsAll: number;
  newsPublished: number;
  newsUnpublished: number;
  employeeAll: number;
  partnersAll: number;
  ordersAll: number;
  ordersBooked: number;
  ordersConsiders: number;
  ordersApproved: number;
  partnerOrdersAll: number;
  totalGuideOrders: number;
  platFormReviews: number;
}

export interface IPartnerOrder {
  _id: string;
  name: string;
  number: string;
  message: string;
  image: string;
  link: string;
}

export interface IPartnerOrderMutation {
  name: string;
  number: string;
  message: string;
  link: string;
  image: File | null;
}

export interface RegisterMessage {
  message: string;
}

export interface StatisticsInfo {
  title: string;
  text1: string;
  text2: string;
}
