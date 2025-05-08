import React, { useEffect, useState } from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  resetPostReviewError,
  selectOneTour,
  selectPostReviewError,
} from '@/containers/tours/toursSlice';
import { fetchTour } from '@/containers/tours/toursThunk';
import { useParams } from 'next/navigation';
import { apiUrl } from '@/constants';
import OneTourInformation from '@/components/OneTourPage/OneTourInformation/OneTourInformation';
import OneTourPlan from '@/components/OneTourPage/OneTourPlan/OneTourPlan';
import Gallery from '@/components/OneTourPage/Gallery/Gallery';
import OneTourReview from '@/components/OneTourPage/OneTourReview/OneTourReview';
import OneTourOrderForm from '@/components/OneTourOrderForm/OneTourOrderForm';
import PageLoader from '@/components/Loaders/PageLoader';
import { fetchToursReviews } from '@/containers/reviews/reviewThunk';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';
import GoogleMap from '@/components/GoogleMap/GoogleMap';
import { useTranslations } from 'next-intl';
import '@/styles/OneTourPage.css';
import Head from 'next/head';

interface ITab {
  title: string;
  name: string;
}

const TABS: ITab[] = [
  { title: 'Information', name: 'information' },
  { title: 'Tour plan', name: 'plan' },
  { title: 'Location', name: 'location' },
  { title: 'Gallery', name: 'gallery' },
  { title: 'Reviews', name: 'reviews' },
];

const TourPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { id } = useParams() as {
    id: string;
  };
  const dispatch = useAppDispatch();
  const tour = useAppSelector(selectOneTour);
  const postReviewError = useAppSelector(selectPostReviewError);
  const [currentTab, setCurrentTab] = useState<string>('information');
  const [adaptiveTabBtns, setAdaptiveTabBtns] = useState('');
  const t = useTranslations('oneTour');

  useEffect(() => {
    if (postReviewError) {
      dispatch(resetPostReviewError());
    }
    dispatch(setIsLightMode(false));
    dispatch(fetchTour(id));
    dispatch(fetchToursReviews(id));
  }, [dispatch, postReviewError, id]);

  if (!tour) return <Custom404 errorType="tour" />;

  const toggleTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setCurrentTab(name);
    closeNav();
  };

  const closeNav = () => {
    if (adaptiveTabBtns === '') return;
    setAdaptiveTabBtns('closed');
    setTimeout(() => {
      setAdaptiveTabBtns('');
    }, 300);
  };

  const navBtnToggle = () => {
    if (adaptiveTabBtns === 'open') {
      closeNav();
      return;
    }
    setAdaptiveTabBtns('open');
  };

  return (
    <>
      <Head>
        <title>{tour.name}</title>
        <meta name="description" content={tour.description} />
      </Head>
      <div className="one-tour" onClick={() => closeNav()}>
        <PageLoader />
        <div className="one-tour-top">
          <div
            className="one-tour-top-info"
            style={{
              backgroundImage: `url('${apiUrl + '/' + tour.mainImage}')`,
            }}
          >
            <div className="one-tour-top-line"></div>
            <h2 className="one-tour-top-title">{tour.name}</h2>
            <div className="one-tour-btns">
              <button className="one-tour-btn-one">
                {t(`tour_video_preview`)}
              </button>
              <button className="one-tour-btn-two">
                {t(`tour_view_photos`)}
              </button>
            </div>
          </div>
          <div className="one-tour-slider-btns">
            {TABS.map(({ name }) => (
              <button
                name={name}
                onClick={toggleTab}
                className={
                  currentTab === name
                    ? `one-tour-slider-${name} btn-active`
                    : `one-tour-slider-${name} one-tour-slider-btns-btn`
                }
                key={`${name}-tab`}
              >
                <span>{t(`tour_tab_${name}`)}</span>
              </button>
            ))}
          </div>
          <div
            className="adaptive-one-tour-slider-btns"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="show-tour-tab-btns" onClick={navBtnToggle}>
              <span>Navigation</span>
            </button>
            <div className={`tour-tab-btns tour-tab-btns-${adaptiveTabBtns}`}>
              {TABS.map(({ name }) => (
                <button
                  name={name}
                  onClick={toggleTab}
                  className={`tour-tab-btn tour-tab-btn-${name}`}
                  key={`${name}-tab`}
                >
                  <span>{t(`tour_tab_${name}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="container one-tour-tab">
          <>
            {currentTab === 'information' && <OneTourInformation />}
            {currentTab === 'plan' && <OneTourPlan />}
            {currentTab === 'location' && (
              <GoogleMap
                width="100%"
                height="500px"
                map={tour.map}
                mapLink={tour.mapLink}
              />
            )}
            {currentTab === 'gallery' && <Gallery />}
            {currentTab === 'reviews' && <OneTourReview />}
          </>
          <OneTourOrderForm date={tour.date} />
        </div>
      </div>
    </>
  );
};

export default TourPage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
