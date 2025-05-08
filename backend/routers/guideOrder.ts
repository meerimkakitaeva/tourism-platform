import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import GuideOrder from '../models/GuideOrder';
import permit from '../middleware/permit';

const guideOrderRouter = express.Router();

guideOrderRouter.get('/', auth, permit('admin'), async (req, res) => {
  try {
    const orders = await GuideOrder.find();
    return res.send(orders);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guideOrderRouter.get('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const oneOrder = await GuideOrder.findById(req.params.id).populate(
      'user',
      'displayName',
    );

    if (!oneOrder) {
      return res.status(404).send('Not found!');
    }
    return res.send(oneOrder);
  } catch (e) {
    return res.status(500).send('Error');
  }
});
guideOrderRouter.post('/', auth, async (req, res, next) => {
  try {
    const order = new GuideOrder({
      user: req.body.user,
      name: req.body.name,
      surname: req.body.surname,
      number: req.body.number,
      message: req.body.message,
    });

    await order.save();
    return res.send(order);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

guideOrderRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const order = await GuideOrder.findById(req.params.id);
      if (!order) {
        return res.status(404).send('Tour not found');
      }
      await order.deleteOne();

      return res.send('Guide order deleted successfully');
    } catch (e) {
      return next(e);
    }
  },
);
export default guideOrderRouter;
