import React from 'react';
import { Fade } from 'react-awesome-reveal';
import dayjs from 'dayjs';
import { useAppSelector } from '@/store/hooks';
import { selectToursReviews } from '@/containers/reviews/reviewSlice';
import NewReviewForm from '@/components/NewReviewForm/NewReviewForm';
import { selectUser } from '@/containers/users/usersSlice';
import { useTranslations } from 'next-intl';
import { selectOneTour } from '@/containers/tours/toursSlice';
import '@/styles/OneTourReview.css';

const OneTourReview = () => {
  const toursReviews = useAppSelector(selectToursReviews);
  const user = useAppSelector(selectUser);
  const tour = useAppSelector(selectOneTour);
  let reviewTotal = '';
  const t = useTranslations('oneTour');

  if (!tour) {
    return;
  }

  if (tour.rating === 5) {
    reviewTotal = t('tour_rating_super');
  } else if (tour.rating >= 4) {
    reviewTotal = t('tour_rating_good');
  } else if (tour.rating >= 3) {
    reviewTotal = t('tour_rating_normal');
  } else if (tour.rating >= 2) {
    reviewTotal = t('tour_rating_bad');
  } else if (tour.rating >= 1) {
    reviewTotal = t('tour_rating_very_bad');
  } else {
    reviewTotal = t('tour_not_rated');
  }

  const calculatePercentageOfMax = (value: number, max: number): number => {
    if (max === 0) {
      return 0;
    }

    const percentage = (value / max) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  let percentage = calculatePercentageOfMax(tour.rating, 5);
  if (tour.rating === 0) {
    percentage = 0;
  }

  return (
    <div className="one-tour-reviews">
      <div className="one-tour-reviews-inner">
        <Fade>
          <div className="one-tour-average-wrap">
            <div className="one-tour-average-num">
              <h5>{tour.rating}</h5>
              <p>{reviewTotal}</p>
            </div>
            <div className="one-tour-average-progress">
              <div
                className="one-tour-average-filler"
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="one-tour-review-wrap">
            {toursReviews.map((review, index) => (
              <div className="one-tour-review" key={index}>
                <h3>{review.user.displayName}</h3>
                <div className="one-tour-review-date">
                  {dayjs(review.date).format('DD.MM.YYYY')}
                </div>
                <div className="one-tour-review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </Fade>
        <div>{user && <NewReviewForm />}</div>
      </div>
    </div>
  );
};

export default OneTourReview;
