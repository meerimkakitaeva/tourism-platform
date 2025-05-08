import mongoose from 'mongoose';
import Tour from './models/Tour';
import TourRating from './models/TourRating';
import config from './config';
import Guide from './models/Guide';
import GuideRating from './models/GuideRating';

const ratingCalculate = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  const tours = await Tour.find();
  const guides = await Guide.find();

  const tourRating = tours.map(async (tour) => {
    const rating = await TourRating.find({ tour: tour._id });

    if (rating.length > 0) {
      const ratingReduce = rating.reduce((acc, value) => {
        return acc + value.rating;
      }, 0);

      tour.rating = +(ratingReduce / rating.length).toFixed(1);

      await tour.save();
      return tour;
    }

    await tour.save();
    return tour;
  });

  await Promise.all(tourRating);

  const guidesRating = guides.map(async (guide) => {
    const rating = await GuideRating.find({ guide: guide._id });

    if (rating.length > 0) {
      const ratingReduce = rating.reduce((acc, value) => {
        return acc + value.rating;
      }, 0);

      guide.rating = +(ratingReduce / rating.length).toFixed(1);

      await guide.save();
      return guide;
    }

    await guide.save();
    return guide;
  });

  await Promise.all(guidesRating);

  await db.close();
};

ratingCalculate().catch(console.error);
