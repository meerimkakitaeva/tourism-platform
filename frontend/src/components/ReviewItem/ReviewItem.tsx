import React from 'react';
import { allReviews } from '@/type';
import dayjs from 'dayjs';
import { Fade } from 'react-awesome-reveal';

interface Props {
  reviews: allReviews;
}

const ReviewItem: React.FC<Props> = ({ reviews }) => {
  let title = '';

  if (reviews.tour) {
    title = 'tour';
  } else if (reviews.guide) {
    title = 'guide';
  } else {
    title = 'platform';
  }
  return (
    <Fade>
      <div className="reviews-item">
        <h2>Review of {title}</h2>
        <div className="reviews-date">
          {dayjs(reviews.date).format('DD.MM.YYYY')}
        </div>
        <div className="reviews-comment">{reviews.comment}</div>
        <div className="reviews-user">{reviews.user.displayName}</div>
      </div>
    </Fade>
  );
};

export default ReviewItem;
