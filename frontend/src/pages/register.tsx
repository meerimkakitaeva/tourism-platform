import React, { useEffect } from 'react';
import SignUpForm from '@/components/Forms/SignUpForm/SignUpForm';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useAppDispatch } from '@/store/hooks';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const Register = () => {
  const dispatch = useAppDispatch();
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{metaT('register')}</title>
        <meta name="description" content="Sign" />
      </Head>
      <div>
        <SignUpForm />
      </div>
    </>
  );
};

export default Register;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
