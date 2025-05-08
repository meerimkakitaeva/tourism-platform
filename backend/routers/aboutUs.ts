import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import AboutUs from '../models/AboutUs';
import { IAboutUsBlock, ILanguages } from '../type';
import auth from '../middleware/auth';
import permit from '../middleware/permit';

interface IContent {
  title: {
    en: string;
    ru: string;
    kg: string;
  };
  description: {
    en: string;
    ru: string;
    kg: string;
  };
  image: string;
  _id?: string;
}

interface IAboutKeys {
  [key: string]: IContent | IContent[];
}

const aboutUsRouter = express.Router();

aboutUsRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const [aboutUs] = await AboutUs.find();
    const content: IAboutKeys = aboutUs.toObject();
    const keyNames = Object.keys(content);
    let localizedData = {};

    keyNames.forEach((key) => {
      const langData = content[key];
      if (Array.isArray(langData)) {
        const posts = langData.map((post) => ({
          title: post.title[lang],
          description: post.description[lang],
          image: post.image,
          _id: post._id,
        }));
        localizedData = {
          ...localizedData,
          [key]: posts,
        };
        return;
      }
      const { title, description, image } = langData;
      if (title && description) {
        localizedData = {
          ...localizedData,
          [key]: {
            title: title[lang],
            description: description[lang],
            image: image || '',
          },
        };
      }
    });

    return res.send(localizedData);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

aboutUsRouter.put(
  '/:sectionName',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
      const sectionName = req.params.sectionName as
        | 'main'
        | 'offer'
        | 'posts'
        | 'review';

      const queryPostId = req.query.postId;

      const [aboutUs] = await AboutUs.find();

      const section = aboutUs[sectionName] as HydratedDocument<
        IAboutUsBlock | IAboutUsBlock[]
      >;

      const sectionKeys = Object.keys(req.body) as Array<keyof IAboutUsBlock>;

      if (!section) {
        return res.status(404).send({ error: 'This section not found' });
      }

      if (!(section instanceof Array)) {
        sectionKeys.forEach((key) => {
          if ((key !== 'image' && key === 'title') || key === 'description') {
            section[key] = {
              ...section[key],
              [lang]: req.body[key],
            } as ILanguages;
          } else {
            section[key] = req.body[key];
          }
        });
      } else {
        const post = aboutUs.posts.find(
          (post) => post._id?.toString() === queryPostId,
        );

        if (!post) {
          return res.status(404).send({ error: 'This post not found!' });
        }

        aboutUs.posts.map((post, index) => {
          if (post._id && post._id.toString() === queryPostId) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            aboutUs.posts[index] = {
              _id: req.body._id,
              image: req.body.image,
              title: {
                ...aboutUs.posts[index].title,
                [lang]: req.body.title,
              },
              description: {
                ...aboutUs.posts[index].description,
                [lang]: req.body.description,
              },
            };
          }
        });
      }

      await aboutUs.save();

      return res.send(aboutUs);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

aboutUsRouter.post('/posts', auth, permit('admin'), async (req, res, next) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    const [aboutUs] = await AboutUs.find();

    const newSection: IAboutUsBlock = {
      title: {
        en: '',
        ru: '',
        kg: '',
        [`${lang}`]: req.body.title,
      },
      description:
        {
          en: '',
          ru: '',
          kg: '',
          [`${lang}`]: req.body.description,
        } || null,
      image: req.body.image || null,
    };

    aboutUs.posts.push(newSection);

    await aboutUs.save();

    return res.send(aboutUs);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

aboutUsRouter.delete(
  '/posts/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const [aboutUs] = await AboutUs.find();

      const post = aboutUs.posts.find(
        (post) => post._id?.toString() === req.params.id,
      );

      if (!post) {
        return res.status(404).send({ error: 'This post not found!' });
      }

      await post.deleteOne();

      await aboutUs.save();

      return res.send(aboutUs);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

export default aboutUsRouter;
