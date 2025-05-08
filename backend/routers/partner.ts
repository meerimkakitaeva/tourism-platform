import express from 'express';
import mongoose from 'mongoose';
import Partner from '../models/Partner';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';

const partnersRouter = express.Router();

partnersRouter.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    return res.send(partners);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

partnersRouter.get('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).send('Partner not found');
    }

    return res.send(partner);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

partnersRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const partner = new Partner({
        name: req.body.name,
        link: req.body.link,
        image: req.file ? req.file.filename : null,
      });
      await partner.save();
      return res.send(partner);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

partnersRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const partnerId = req.params.id;

      const existingPartner = await Partner.findById(partnerId);

      if (!existingPartner) {
        return res.status(404).send('Partner not found');
      }

      existingPartner.name = req.body.name
        ? req.body.name
        : existingPartner.name;
      existingPartner.link = req.body.link
        ? req.body.link
        : existingPartner.link;
      existingPartner.image = req.file
        ? 'images/' + req.file.filename
        : existingPartner.image;

      await existingPartner.save();
      return res.send(existingPartner);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

partnersRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const partnerId = req.params.id;

    const existingPartner = await Partner.findById(partnerId);

    if (!existingPartner) {
      return res.status(404).send('Partner not found');
    }

    await existingPartner.deleteOne();
    res.send('Partner deleted!');
  } catch (e) {
    return next(e);
  }
});
export default partnersRouter;
