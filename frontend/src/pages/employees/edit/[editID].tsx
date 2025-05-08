import React, { useEffect } from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'next/navigation';
import { selectOneEmployee } from '@/containers/about/aboutSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { fetchOneEmployee } from '@/containers/about/aboutThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import EmployeeForm from '@/components/Forms/EmployeeForm/EmployeeForm';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const EditTeam: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const dispatch = useAppDispatch();
  const employee = useAppSelector(selectOneEmployee);
  const { editID } = useParams() as {
    editID: string;
  };
  const user = useAppSelector(selectUser);
  const t = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (editID) {
      dispatch(fetchOneEmployee(editID));
    }
  }, [editID, dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  let editingEmployee;

  if (employee) {
    editingEmployee = {
      name: employee.name,
      number: employee.number,
      role: employee.role,
      image: null,
    };
  }

  return (
    <>
      <Head>
        <title>
          {t('edit_employee_title')} - {employee?.name}
        </title>
        <meta name="description" content={t('edit_employee_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="form-block">
          {editingEmployee && (
            <EmployeeForm
              isEdit
              existingEmployee={editingEmployee}
              idEmployee={employee?._id}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditTeam;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
