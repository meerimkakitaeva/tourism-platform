import mongoose, { HydratedDocument } from 'mongoose';
import { IPartner } from '../type';

const PartnerOrderSchema = new mongoose.Schema({
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
  message: {
    type: String,
  },
  number: {
    type: String,
    required: true,
  },
});

const PartnerOrder = mongoose.model('PartnerOrder', PartnerOrderSchema);
export default PartnerOrder;
