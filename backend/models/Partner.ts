import mongoose, { HydratedDocument } from 'mongoose';
import { IPartner } from '../type';

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<IPartner>, name: string) {
        return !!(this.image || name);
      },
      message: 'Name or image is required!',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<IPartner>, image: string) {
        return !!(this.name || image);
      },
      message: 'Name or image is required!',
    },
  },
  link: {
    type: String,
  },
});

const Partner = mongoose.model('Partner', PartnerSchema);
export default Partner;
