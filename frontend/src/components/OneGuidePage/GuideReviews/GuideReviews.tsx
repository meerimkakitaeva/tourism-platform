import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectGuidesReviews } from '@/containers/reviews/reviewSlice';
import { Fade } from 'react-awesome-reveal';
import { selectUser } from '@/containers/users/usersSlice';
import OneReview from '@/components/OneReview/OneReview';
import NewReview from '@/components/Forms/newReview/NewReview';
import { selectOneGuide } from '@/containers/guides/guidesSlice';
import { useTranslations } from 'next-intl';

const GuideReviews = () => {
  const reviews = useAppSelector(selectGuidesReviews);
  const guide = useAppSelector(selectOneGuide);
  const user = useAppSelector(selectUser);
  const t = useTranslations('guide');
  let reviewTotal = '';

  if (!guide) return null;

  if (guide.rating === 5) {
    reviewTotal = t('rating_super');
  } else if (guide.rating >= 4) {
    reviewTotal = t('rating_good');
  } else if (guide.rating >= 3) {
    reviewTotal = t('rating_normal');
  } else if (guide.rating >= 2) {
    reviewTotal = t('rating_bad');
  } else if (guide.rating >= 1) {
    reviewTotal = t('rating_very_bad');
  } else {
    reviewTotal = t('not_rated');
  }

  const calculatePercentageOfMax = (value: number, max: number): number => {
    if (max === 0) {
      return 0;
    }

    const percentage = (value / max) * 100;
    return parseFloat(percentage.toFixed(2));
  };

  let percentage = calculatePercentageOfMax(guide.rating, 5);
  if (guide.rating === 0) {
    percentage = 0;
  }

  return (
    <div className="one-guide_reviews">
      <div className="one-guide_reviews-inner">
        <Fade>
          <div className="one-guide_average-wrap">
            <div className="one-guide_average-num">
              <h5>{guide.rating}</h5>
              <p>{reviewTotal}</p>
            </div>
            <div className="one-guide_average-progress">
              <div
                className="one-guide_average-filler"
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="one-guide_review-wrap">
            {reviews.map((review, index) => (
              <OneReview review={review} key={review._id} />
            ))}
          </div>
        </Fade>
        <div>{user && <NewReview guideReview={true} />}</div>
      </div>
    </div>
  );
};

export default GuideReviews;
