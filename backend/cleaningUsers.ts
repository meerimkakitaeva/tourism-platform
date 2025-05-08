import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Token from './models/Token';

const cleaningUsers = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  const users = await User.find({ verified: false });

  const cleanUsers = users.map(async (user) => {
    const confirmToken = await Token.findOne({ userId: user._id });

    if (!confirmToken) {
      await user.deleteOne();
      return null;
    }

    return user;
  });

  await Promise.all(cleanUsers);

  await db.close();
};

cleaningUsers().catch(console.error);
