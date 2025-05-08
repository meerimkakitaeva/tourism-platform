import express from 'express';
import Order from '../models/Order';
import mongoose from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import nodemailer from 'nodemailer';
import Tour from '../models/Tour';
import config from '../config';
import { ILanguages } from '../type';

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
  try {
    const lang = (req.get('lang') as 'en') || 'ru' || 'kg';
    if (req.query.userID) {
      const queryUser = req.query.userID as string;
      const orders = await Order.find({ user: queryUser })
        .populate({
          path: 'guide',
          populate: {
            path: 'user',
            model: 'User',
            select: 'displayName email',
          },
        })
        .populate({ path: 'tour', select: 'name' })
        .populate({ path: 'user', select: 'displayName email' });
      if (req.query.datetime && req.query.datetime.length) {
        const datetime = req.query.datetime as string;
        const localizedTours = orders.map((order) => ({
          ...order.toObject().tour,
          name: (
            order.toObject().tour as {
              name: ILanguages;
            }
          ).name[lang],
        }));
        const localizedOrders = orders.map((order, index) => ({
          ...order.toObject(),
          tour: localizedTours[index],
        }));
        const filteredData = localizedOrders.filter(
          (item) => item.datetime > datetime,
        );
        return res.send(filteredData);
      }

      const localizedTours = orders.map((order) => ({
        ...order.toObject().tour,
        name: (
          order.toObject().tour as {
            name: ILanguages;
          }
        ).name[lang],
      }));
      const localizedOrders = orders.map((order, index) => ({
        ...order.toObject(),
        tour: localizedTours[index],
      }));
      return res.send(localizedOrders);
    }
    const orders = await Order.find()
      .populate({
        path: 'guide',
        populate: { path: 'user', model: 'User', select: 'displayName email' },
      })
      .populate({ path: 'tour', select: 'name' })
      .populate({ path: 'user', select: 'displayName email' });
    if (req.query.datetime && req.query.datetime.length) {
      const datetime = req.query.datetime as string;
      const localizedTours = orders.map((order) => ({
        ...order.toObject().tour,
        name: (
          order.toObject().tour as {
            name: ILanguages;
          }
        ).name[lang],
      }));
      const localizedOrders = orders.map((order, index) => ({
        ...order.toObject(),
        tour: localizedTours[index],
      }));
      const filteredData = localizedOrders.filter(
        (item) => item.datetime > datetime,
      );
      return res.send(filteredData);
    }

    const localizedTours = orders.map((order) => ({
      ...order.toObject().tour,
      name: (
        order.toObject().tour as {
          name: ILanguages;
        }
      ).name[lang],
    }));
    const localizedOrders = orders.map((order, index) => ({
      ...order.toObject(),
      tour: localizedTours[index],
    }));
    return res.send(localizedOrders);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

ordersRouter.post('/', async (req, res, next) => {
  try {
    const order = new Order({
      guide: req.body.guide,
      tour: req.body.tour,
      price: req.body.price,
      date: req.body.date,
      user: req.body.user,
      email: req.body.email,
      phone: req.body.phone,
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

ordersRouter.delete(
  '/:id',
  auth,
  permit('moderator'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).send('Order not found');
      }

      await order.deleteOne();

      return res.send('Order deleted successfully');
    } catch (e) {
      return next(e);
    }
  },
);

ordersRouter.patch(
  '/changeStatus',
  auth,
  permit('moderator'),
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.query.orderId);

      if (!order) {
        return res.status(404).send('Order not found');
      }

      order.status = req.body.status;
      await order.save();
      return res.send(order);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

ordersRouter.post('/sendEmail/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send('Order not found!');
    }

    if (order.status === 'approved') {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: config.auth,
      });

      const blockStyle: string = `
          max-width: 700px;
          border: 3px solid #75c15b;
          border-radius: 10px;
          padding: 10px;
          margin: 0;
          font-family: JetBrains Mono, sans-serif;
        `;

      const hrStyle = `
          width: 3px;
          height: 30px;
          background-color: #75c15b;
          border: none;
          margin: 0;
          margin-left: 10%;
        `;

      const tour = await Tour.findById(order.tour);
      const lang = (req.get('lang') as 'en') || 'ru' || 'kg';

      let error: Error | null = null;

      transporter.sendMail(
        {
          from: `Tourism Platform Concept <${config.auth.user}>`,
          to: order.email,
          subject: tour && tour.name ? tour.name[lang] : 'TPC',
          html: `
              <div>
                <h2 style='${blockStyle}'>Ваше заявление на бронирование тура было успешно одобрено!</h2>
                <hr style='${hrStyle}'>
                <h2 style='${blockStyle}margin-left: 5%;'>${order.price} сом</h2>
              </div>
            `,
        },
        (err) => {
          if (err) {
            error = err;
          }
        },
      );

      if (error) {
        return res.status(500).send('Something went wrong!');
      } else {
        order.isSendEmail = true;
        await order.save();
        return res.send('The message was successfully delivered');
      }
    } else {
      return res
        .status(400)
        .send('This order must have a status of "approved"');
    }
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default ordersRouter;
