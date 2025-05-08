import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllTours } from '@/containers/tours/toursSlice';
import TourListItem from '@/components/TourListItem/TourListItem';
import {
  fetchTours,
  fetchToursWithDiscountPrice,
} from '@/containers/tours/toursThunk';
import MainSlider from '@/components/MainSlider/MainSlider';
import Link from 'next/link';
import PageLoader from '@/components/Loaders/PageLoader';
import HotTours from '@/components/HotTours/HotTours';
import ReviewsMain from '@/components/ReviewsMain/ReviewsMain';
import { fetchPlatformReviews } from '@/containers/reviews/reviewThunk';
import { selectPlatformReviews } from '@/containers/reviews/reviewSlice';
import Statistics from '@/components/Statistics/Statistics';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useTranslations } from 'next-intl';
import '@/styles/ToursPage.css';

const ToursPage = () => {
  const tours = useAppSelector(selectAllTours);
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectPlatformReviews);
  const t = useTranslations('main');

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(fetchPlatformReviews());
    dispatch(fetchTours());
    dispatch(fetchToursWithDiscountPrice());
  }, [dispatch]);

  return (
    <>
      <MainSlider />
      <PageLoader />
      <div className="featured-tours">
        <div className="container">
          <h2 className="tours-page-title">{t('main_title')}</h2>
          <div className="tours-page">
            {tours.map((tour) => (
              <TourListItem tour={tour} key={tour._id} />
            ))}
          </div>
          <div className="tours-page-link">
            <Link href={`/tours/all/${1}`} className="tours-page-link-tours">
              {t('seeAll_btn')}
            </Link>
          </div>
        </div>
        <div>
          <Statistics />
        </div>
        <HotTours />
      </div>
      <div>{<ReviewsMain reviews={reviews} />}</div>
    </>
  );
};

export default ToursPage;
