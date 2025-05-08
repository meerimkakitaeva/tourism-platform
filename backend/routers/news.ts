import express from 'express';
import News from '../models/News';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const news = await News.find();

    const localizedNews = news.map((item) => {
      return {
        ...item.toObject(),
        title: item.toObject().title?.[lang],
      };
    });
    return res.send(localizedNews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.get('/all', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    if (req.query.true === 'all') {
      const news = await News.find();
      const localizedNews = news.map((item) => {
        return {
          ...item.toObject(),
          title: item.toObject().title?.[lang],
        };
      });
      return res.send(localizedNews);
    }

    const news = await News.find({
      isPublished: !(req.query.true === 'private'),
    });
    const localizedNews = news.map((item) => {
      return {
        ...item.toObject(),
        title: item.toObject().title?.[lang] || item.toObject().title.en,
      };
    });
    return res.send(localizedNews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.get('/:id', async (req, res) => {
  try {
    const oneNews = await News.findById(req.params.id);
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';

    if (!oneNews) {
      return res.status(404).send('Not found!');
    }

    const localizedNews = {
      ...oneNews.toObject(),
      title: oneNews.toObject().title?.[lang],
      description: oneNews.toObject().description?.[lang],
    };

    return res.send(localizedNews);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

newsRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.fields([
    {
      name: 'images',
      maxCount: 10,
    },
  ]),
  async (req, res, next) => {
    try {
      const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
      const images =
        req.files && 'images' in req.files
          ? (req.files as { [fieldname: string]: Express.Multer.File[] })[
              'images'
            ].map((file) => 'images/' + file.filename)
          : [];

      const category = req.body.category ? req.body.category : [];
      const news = new News({
        title: {
          en: '',
          ru: '',
          kg: '',
          [`${lang}`]: req.body.title,
        },
        description: {
          en: '',
          ru: '',
          kg: '',
          [`${lang}`]: req.body.description,
        },
        images,
        category,
      });

      await news.save();
      return res.send(news);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

newsRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.fields([
    {
      name: 'images',
      maxCount: 10,
    },
  ]),
  async (req, res, next) => {
    try {
      const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
      const newsId = req.params.id;
      const news = await News.findById(newsId);

      if (!news) {
        return res.status(404).send('News not found');
      }

      const category = req.body.category ? req.body.category : news.category;

      const images =
        req.files && 'images' in req.files
          ? req.files['images'].map(
              (file: Express.Multer.File) => 'images/' + file.filename,
            )
          : news.images;

      news.title[lang] = req.body.title || news.title[lang];
      news.images = images;
      news.description[lang] = req.body.description || news.description[lang];
      news.category = category;
      await news.save();

      return res.send(news);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

newsRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const news = await News.findById(id);

      if (!news) {
        return res.status(404).send('Not Found!');
      }

      await News.findByIdAndUpdate(id, { isPublished: !news.isPublished });
      return res.send('Changed');
    } catch (e) {
      return next(e);
    }
  },
);

newsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).send('News not found');
    }
    await news.deleteOne();
    return res.send('News deleted!');
  } catch (e) {
    return next(e);
  }
});

export default newsRouter;
