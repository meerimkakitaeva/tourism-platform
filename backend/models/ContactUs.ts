import mongoose from 'mongoose';

const ContactsSchema = new mongoose.Schema({
  title: {
    type: {
      en: String,
      ru: String,
      kg: String,
    },
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: {
      en: String,
      ru: String,
      kg: String,
    },
    required: true,
  },
  contact: {
    type: [
      {
        country: {
          en: String,
          ru: String,
          kg: String,
        },
        address: {
          en: String,
          ru: String,
          kg: String,
        },
        phone: String,
        _id: String,
      },
    ],
    required: true,
  },
});

const Contacts = mongoose.model('Contacts', ContactsSchema);
export default Contacts;
