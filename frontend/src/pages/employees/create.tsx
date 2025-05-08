import React, { useEffect } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeForm from '@/components/Forms/EmployeeForm/EmployeeForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const NewEmployee = () => {
  const dispatch = useAppDispatch();
  const t = useTranslations('metaTags');

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
        <title>{t('create_employee_title')}</title>
        <meta name="description" content={t('create_employee_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="form-block">
          <EmployeeForm />
        </div>
      </div>
    </>
  );
};

export default NewEmployee;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
