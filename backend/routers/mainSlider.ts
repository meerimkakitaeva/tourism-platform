import express from 'express';
import MainSlider from '../models/MainSlider';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const mainSliderRouter = express.Router();

mainSliderRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const sliders = await MainSlider.find();
    const localizedSliders = sliders.map((sl) => {
      return {
        ...sl.toObject(),
        country: sl.toObject().country?.[lang] || sl.toObject().country?.en,
      };
    });

    return res.send(localizedSliders);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

mainSliderRouter.get('/:id', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const slider = await MainSlider.findById(req.params.id);

    if (!slider) {
      return res.status(404).send('Not found!');
    }

    const oneSlider = {
      _id: slider._id,
      country: slider.country ? slider.country[lang] : slider.country,
      image: slider.image,
    };

    return res.send(oneSlider);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

mainSliderRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const lang = req.get('lang') as 'en' | 'ru' | 'kg';
      const slider = new MainSlider({
        country: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.country,
        },
        image: req.file ? 'images/' + req.file.filename : null,
      });

      await slider.save();
      return res.send(slider);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

mainSliderRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const lang = req.get('lang') as 'en' | 'ru' | 'kg';
      const slider = await MainSlider.findById(req.params.id);

      if (!slider) {
        return res.status(404).send('Not found');
      }

      slider.country = { ...slider.country, [lang]: req.body.country };
      slider.image = req.file ? 'images/' + req.file.filename : slider.image;

      await slider.save();
      return res.send(slider);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

mainSliderRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const slider = await MainSlider.findById(req.params.id);

      if (!slider) {
        return res.status(404).send('Not found');
      }

      await slider.deleteOne();
      return res.send('Employee is deleted!');
    } catch (e) {
      next(e);
    }
  },
);
export default mainSliderRouter;
