import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import MainSliderForm from '@/components/Forms/MainSliderForm/MainSliderForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const NewSlider = () => {
  const dispatch = useAppDispatch();
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const user = useAppSelector(selectUser);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }
  return (
    <>
      <Head>
        <title>{metaT('create_slider_title')}</title>
        <meta name="description" content={metaT('create_slider_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="form-block">
          <MainSliderForm />
        </div>
      </div>
    </>
  );
};

export default NewSlider;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
