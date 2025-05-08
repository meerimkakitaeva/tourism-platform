import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Contacts from '../models/ContactUs';
import { imagesUpload } from '../multer';
import { randomUUID } from 'crypto';

interface IContact {
  country: {
    en: string;
    ru: string;
    kg: string;
  };
  address: {
    en: string;
    ru: string;
    kg: string;
  };
  phone: string;
  _id: string;
}

const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
  try {
    const lang = req.get('lang') as 'en' | 'ru' | 'kg';
    const contacts = await Contacts.findOne();
    if (!contacts) return;
    const localizedContacts = contacts.contact.map((contact) => ({
      country: contact.country?.[lang] || '-',
      address: contact.address?.[lang] || '-',
      phone: contact.phone || '-',
      _id: contact._id,
    }));
    return res.send({
      title: contacts.title[lang] || '-',
      description: contacts.description[lang] || '-',
      image: contacts.image || null,
      contact: localizedContacts || [],
    });
  } catch (e) {
    return res.status(500).send('Error');
  }
});
contactsRouter.put('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const lang = req.get('lang') as 'en' | 'ru' | 'kg';
    const existingContact = await Contacts.findOne();

    if (!existingContact) {
      return res.status(404).send('Contact not found');
    }

    const contacts = req.body.contact.map(
      (contact: IContact, index: number) => ({
        country: {
          en:
            (existingContact.contact[index] &&
              existingContact.contact[index].country?.en) ||
            '',
          ru:
            (existingContact.contact[index] &&
              existingContact.contact[index].country?.ru) ||
            '',
          kg:
            (existingContact.contact[index] &&
              existingContact.contact[index].country?.kg) ||
            '',
          [lang]: contact.country,
        },
        address: {
          en:
            (existingContact.contact[index] &&
              existingContact.contact[index].address?.en) ||
            '',
          ru:
            (existingContact.contact[index] &&
              existingContact.contact[index].address?.ru) ||
            '',
          kg:
            (existingContact.contact[index] &&
              existingContact.contact[index].address?.kg) ||
            '',
          [lang]: contact.address,
        },
        phone: contact.phone,
        _id: contact._id || randomUUID(),
      }),
    );

    existingContact.title[lang] = req.body.title || existingContact.title;
    existingContact.description[lang] =
      req.body.description || existingContact.description;
    existingContact.contact = contacts || existingContact.contact;

    await existingContact.save();
    return res.json(existingContact);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e.message);
    }
    return next(e);
  }
});

contactsRouter.patch(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const existingContact = await Contacts.findOne();

      if (!existingContact) {
        return res.status(404).send('Contact not found');
      }

      existingContact.image = req.file
        ? 'images/' + req.file.filename
        : existingContact.image;

      await existingContact.save();
      return res.json(existingContact);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e.message);
      }
      return next(e);
    }
  },
);

contactsRouter.delete('/', async (req, res) => {
  const id = req.query.id;
  const existingContact = await Contacts.findOne();
  if (id && id !== 'undefined' && existingContact) {
    existingContact.contact = existingContact.contact.filter((contact) => {
      if (contact._id && contact._id !== id) {
        return contact;
      }
    });
    existingContact.save();
  }
  return res.send('Contact successfully deleted!');
});

export default contactsRouter;
