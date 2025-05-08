import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectOneGuide } from '@/containers/guides/guidesSlice';
import React, { useEffect, useState } from 'react';
import { fetchGuide } from '@/containers/guides/guidesThunk';
import { useParams } from 'next/navigation';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';
import PageLoader from '@/components/Loaders/PageLoader';
import Custom404 from '@/pages/404';
import GuideInfo from '@/components/OneGuidePage/GuideInfo/GuideInfo';
import GuideReviews from '@/components/OneGuidePage/GuideReviews/GuideReviews';
import { fetchGuideReviews } from '@/containers/reviews/reviewThunk';
import { fetchToursGuide } from '@/containers/tours/toursThunk';
import Image from 'next/image';
import bgImage from '@/assets/images/bg-image-1.jpg';
import { useTranslations } from 'next-intl';
import '@/styles/OneGuidePage.css';
import Head from 'next/head';

interface IGuidePageTabs {
  name: string;
  title: string;
}

const GuidePageTabs: IGuidePageTabs[] = [
  { title: 'Information', name: 'information' },
  { title: 'Reviews', name: 'reviews' },
];

const OneGuidePage = () => {
  const dispatch = useAppDispatch();
  const guide = useAppSelector(selectOneGuide);
  const { id } = useParams() as {
    id: string;
  };
  const [currentTab, setCurrentTab] = useState<string>('information');
  const t = useTranslations('guide');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(false));
    dispatch(fetchGuide(id));
    dispatch(fetchToursGuide(id));
    dispatch(fetchGuideReviews(id));
  }, [dispatch, id]);

  if (!guide) return <Custom404 errorType="guide" />;

  const clickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setCurrentTab(name);
  };

  return (
    <>
      <Head>
        <title>
          {metaT('guide_title')} - {guide.user.displayName}
        </title>
        <meta name="description" content={metaT('guide_desc')} />
      </Head>
      <div>
        <PageLoader />
        <div className="guide-page_top">
          <Image
            fill
            className="guide-page_img"
            src={bgImage.src}
            alt="mountains"
          />
          <div className="guide-page_top-info">
            <div className="guide-page_top-line"></div>
            <h2 className="guide-page_top-name">{guide.user.displayName}</h2>
          </div>
        </div>
        <div className="one-guide_slider-button">
          {GuidePageTabs.map(({ title, name }) => (
            <button
              name={name}
              onClick={clickTab}
              className={
                currentTab === name
                  ? `one-guide_slider-${name} one-guide_btn-active`
                  : `one-guide_slider-${name} one-guide_slider-btns-btn`
              }
              key={name}
            >
              <span>{t(`${name}`)}</span>
            </button>
          ))}
        </div>
        <div className="container">
          {currentTab === 'information' && <GuideInfo />}
          {currentTab === 'reviews' && <GuideReviews />}
        </div>
      </div>
    </>
  );
};
export default OneGuidePage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
