import express from 'express';
import PartnerOrder from '../models/PartnerOrder';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const partnerOrderRouter = express.Router();

partnerOrderRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    const requests = await PartnerOrder.find();
    return res.send(requests);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

partnerOrderRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const partnerOrder = new PartnerOrder({
        name: req.body.name,
        link: req.body.link,
        message: req.body.message,
        number: req.body.number,
        image: req.file ? req.file.filename : null,
      });
      await partnerOrder.save();
      return res.send(partnerOrder);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);
partnerOrderRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const requestId = req.params.id;
      const requests = await PartnerOrder.findById(requestId);

      if (!requests) {
        return res.status(404).send('Partner order not found');
      }
      await requests.deleteOne();
      return res.send('Partner order deleted!');
    } catch (e) {
      return next(e);
    }
  },
);

export default partnerOrderRouter;
