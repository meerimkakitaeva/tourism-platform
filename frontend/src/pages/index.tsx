import ToursPage from '@/containers/tours/ToursPage';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { useTranslations } from 'next-intl';

const Home = () => {
  const metaT = useTranslations('metaTags');

  return (
    <>
      <Head>
        <title>{metaT('home')}</title>
        <meta name="description" content="Home - Kyrgyz Journey" />
      </Head>
      <ToursPage />
    </>
  );
};

export default Home;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
