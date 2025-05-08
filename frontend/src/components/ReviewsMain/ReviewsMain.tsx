import React, { useEffect, useState } from 'react';
import { ReviewOfPlatform } from '@/type';
import Image from 'next/image';
import { apiUrl } from '@/constants';
import { useTranslations } from 'next-intl';
import '@/styles/reviews.css';

interface Props {
  reviews: ReviewOfPlatform[];
}

const ReviewsMain: React.FC<Props> = ({ reviews }) => {
  const [currentReview, setCurrentReview] = useState<ReviewOfPlatform | null>(
    null,
  );
  const [currentWidth, setCurrentWidth] = useState(0);
  const t = useTranslations('main');

  useEffect(() => {
    setCurrentWidth(window.innerWidth);
    window.addEventListener('resize', () => setCurrentWidth(window.innerWidth));

    setCurrentReview(reviews[0]);
  }, [reviews]);

  return (
    <div className="reviews-main-page">
      <div className="container reviews-main-page-inner">
        <div className="reviews-main-page-content">
          <h2 className="reviews-main-page-title">{t('reviews')}</h2>
          <div className="reviews-main-page-info">
            <div className="reviews-main-page-txt">
              {currentReview?.comment}
            </div>
            <div className="reviews-main-page-author">
              {currentReview?.user.displayName}
            </div>
          </div>
        </div>
        <div className="reviews-main-page-imgs">
          {currentWidth > 1020 && <div></div>}
          {reviews[0] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[0]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => setCurrentReview(reviews[0])}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {reviews[1] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[1]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => {
                    if (reviews[1]) {
                      setCurrentReview(reviews[1]);
                      return;
                    }
                    setCurrentReview(reviews[0]);
                  }}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {reviews[2] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[2]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => {
                    if (reviews[2]) {
                      setCurrentReview(reviews[2]);
                      return;
                    }
                    setCurrentReview(reviews[0]);
                  }}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {reviews[3] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[3]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => {
                    if (reviews[3]) {
                      setCurrentReview(reviews[3]);
                      return;
                    }
                    setCurrentReview(reviews[0]);
                  }}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {reviews[4] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[4]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => {
                    if (reviews[4]) {
                      setCurrentReview(reviews[4]);
                      return;
                    }
                    setCurrentReview(reviews[0]);
                  }}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {currentWidth > 1020 && <div></div>}
          {reviews[5] && (
            <div>
              {currentReview?.user.avatar && (
                <Image
                  src={apiUrl + '/' + reviews[5]?.user.avatar}
                  alt="user-1"
                  className="reviews-main-page-img"
                  onClick={() => {
                    if (reviews[5]) {
                      setCurrentReview(reviews[5]);
                      return;
                    }
                    setCurrentReview(reviews[0]);
                  }}
                  width={100}
                  height={100}
                />
              )}
            </div>
          )}
          {currentWidth > 1020 && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default ReviewsMain;
