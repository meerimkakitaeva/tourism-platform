import express from 'express';
import Guide from '../models/Guide';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import Tour from '../models/Tour';
import User from '../models/User';
import GuideRating from '../models/GuideRating';
import GuideReview from '../models/GuideReview';

const guidesRouter = express.Router();
guidesRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    if (req.query.userID) {
      const queryUser = req.query.userID as string;
      const guide = await Guide.findOne({ user: queryUser });

      if (guide) {
        const updatedGuide = {
          ...guide.toObject(),
          description:
            guide.toObject().description?.[lang] ||
            guide.toObject().description?.en,
          languages:
            guide.toObject().languages?.[lang] ||
            guide.toObject().languages?.en,
          country:
            guide.toObject().country?.[lang] || guide.toObject().country?.en,
        };

        return res.send(updatedGuide);
      } else {
        return res.sendStatus(404);
      }
    }

    const guides = await Guide.find({ isPublished: true }).populate({
      path: 'user',
      select: ['username', 'displayName', 'avatar'],
    });

    const updatedGuides = guides.map((guide) => {
      return {
        ...guide.toObject(),
        description:
          guide.toObject().description?.[lang] ||
          guide.toObject().description?.en,
        languages:
          guide.toObject().languages?.[lang] || guide.toObject().languages?.en,
        country:
          guide.toObject().country?.[lang] || guide.toObject().country?.en,
      };
    });
    return res.send(updatedGuides);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guidesRouter.get('/all', auth, permit('admin'), async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const guides = await Guide.find().populate({
      path: 'user',
      select: ['username', 'displayName', 'avatar'],
    });

    const updatedGuides = guides.map((guide) => {
      return {
        ...guide.toObject(),
        description:
          guide.toObject().description?.[lang] ||
          guide.toObject().description?.en,
        languages:
          guide.toObject().languages?.[lang] || guide.toObject().languages?.en,
        country:
          guide.toObject().country?.[lang] || guide.toObject().country?.en,
      };
    });
    return res.send(updatedGuides);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guidesRouter.get('/filterByName', auth, permit('admin'), async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    if (req.query.name) {
      const guide = await Guide.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $match: {
            'userDetails.username': {
              $regex: req.query.name,
              $options: 'i',
            },
          },
        },
        {
          $project: {
            description: 1,
            languages: 1,
            country: 1,
            image: 1,
            isPublished: 1,
            user: {
              $arrayElemAt: ['$userDetails', 0],
            },
          },
        },
      ]);

      const updatedGuides = guide.map((guide) => {
        return {
          ...guide.toObject(),
          description:
            guide.toObject().description?.[lang] ||
            guide.toObject().description?.en,
          languages:
            guide.toObject().languages?.[lang] ||
            guide.toObject().languages?.en,
          country:
            guide.toObject().country?.[lang] || guide.toObject().country?.en,
        };
      });

      return res.send(updatedGuides);
    } else {
      return res.send([]);
    }
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guidesRouter.get('/:id', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const id = req.params.id;
    const guide = await Guide.findById(id).populate({
      path: 'user',
      select: 'username  displayName  avatar',
    });

    if (!guide) {
      return res.status(404).send('Not found');
    }

    const updatedGuide = {
      ...guide.toObject(),
      description:
        guide.toObject().description?.[lang] ||
        guide.toObject().description?.en,
      languages:
        guide.toObject().languages?.[lang] || guide.toObject().languages?.en,
      country: guide.toObject().country?.[lang] || guide.toObject().country?.en,
    };

    return res.send(updatedGuide);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

guidesRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const lang = req.get('lang') as 'en' | 'ru' | 'kg';
      const guide = new Guide({
        user: req.body.user,
        languages: {
          en: [],
          ru: [],
          kg: [],
          [lang]: req.body.languages,
        },
        country: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.country,
        },
        description: {
          en: '',
          ru: '',
          kg: '',
          [lang]: req.body.description,
        },
        image: req.file ? req.file.filename : null,
      });

      await guide.save();
      return res.send(guide);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

guidesRouter.put(
  '/:id',
  auth,
  permit('admin', 'guid'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const lang = req.get('lang') as 'en' | 'ru' | 'kg';
      const guide = await Guide.findById(req.params.id);

      if (!guide) {
        return res.status(404).send('Not found');
      }

      const image =
        req.files && 'image' in req.files
          ? 'images/' + req.files['image'][0].filename
          : guide.image;

      guide.country =
        { ...guide.country, [lang]: req.body.country } || guide.country;
      guide.description =
        { ...guide.description, [lang]: req.body.description } ||
        guide.description;
      guide.image = image;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      guide.languages =
        { ...guide.languages, [lang]: req.body.languages } || guide.languages;

      await guide.save();
      return res.send(guide);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

guidesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const guide = await Guide.findById(req.params.id);

    if (!guide) {
      return res.status(404).send('Not found');
    }

    await GuideRating.deleteMany({ guide: guide._id });
    await GuideReview.deleteMany({ guide: guide._id });

    await Tour.updateMany(
      { guides: req.params.id },
      { $pull: { guides: req.params.id } },
    );

    const user = await User.findOne({ _id: guide.user });
    if (user) {
      user.role = 'user';
      await user.save();
    }

    await guide.deleteOne();
    return res.send('Guide is deleted!');
  } catch (e) {
    return next(e);
  }
});

guidesRouter.patch(
  '/:id/togglePublished',
  auth,
  permit('admin'),
  async (req, res) => {
    try {
      const id = req.params.id;
      const guide = await Guide.findById(id);

      if (!guide) {
        return res.status(404).send('Not Found!');
      }

      await Guide.findByIdAndUpdate(id, { isPublished: !guide.isPublished });

      res.send('Guide is changed');
    } catch (e) {
      res.status(500).send(e);
    }
  },
);

export default guidesRouter;
