import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import User from '../models/User';
import { IUser } from '../type';

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
  const req = expressReq as RequestWithUser;
  const token = req.get('Authorization');

  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: 'Wrong token' });
  }

  req.user = user;
  next();
};

export default auth;
