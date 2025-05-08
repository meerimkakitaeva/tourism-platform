import React, { useEffect } from 'react';
import image404 from '@/assets/images/404.jpg';
import Image from 'next/image';
import PageLoader from '@/components/Loaders/PageLoader';
import Link from 'next/link';
import { useAppDispatch } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useTranslations } from 'next-intl';
import { GetServerSideProps } from 'next';
import '@/styles/error404.css';
import '@/styles/about.css';
import Head from 'next/head';

export default function Custom404({
  errorType,
}: {
  errorType?: 'guide' | 'tour';
}) {
  const dispatch = useAppDispatch();
  const t = useTranslations('404page');

  useEffect(() => {
    dispatch(setIsLightMode(false));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content="Page is not found" />
      </Head>
      <div className="page-error">
        <PageLoader />
        <div className="header-error">
          <Image src={image404} className="about-page-img" alt="error404" />
          <div className="error-page-top-info">
            <div className="about-page-top-line"></div>
            <h2 className="about-page-top-title">{t('title')}</h2>
            <div className="about-page-top-txt">
              {t('description')}
              <Link href="/" className="about-page-top-txt">
                {t('link')}
              </Link>
              .
            </div>
          </div>
        </div>

        <section className="section-error">
          <div className="container-error">
            <div className="text-group-1">
              <p className="text-xxl">404</p>
              <h4 className="error-title">{t('text')}</h4>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
