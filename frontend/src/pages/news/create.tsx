import React from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import NewsForm from '@/components/Forms/NewsForm/NewsForm';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const Create = () => {
  const t = useTranslations('metaTags');
  return (
    <>
      <Head>
        <title>{t('create_news_title')}</title>
        <meta name="description" content={t('create_news_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container news-create-page">
        <PageLoader />
        <NewsForm />
      </div>
    </>
  );
};

export default Create;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
