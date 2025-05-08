import React from 'react';
import dayjs from 'dayjs';
import { ReviewOfGuides, ReviewOfTour } from '@/type';
import '@/styles/OneReview.css';

interface IProps {
  review: ReviewOfGuides | ReviewOfTour;
}

const OneReview: React.FC<IProps> = ({ review }) => {
  return (
    <div className="one-review">
      <h3 className="one-review_name">{review.user.displayName}</h3>
      <div className="one-review_date">
        {dayjs(review.date).format('DD.MM.YYYY')}
      </div>
      <div className="one-review_comment">{review.comment}</div>
    </div>
  );
};

export default OneReview;
