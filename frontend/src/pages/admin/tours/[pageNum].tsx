import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAdminTours, fetchTours } from '@/containers/tours/toursThunk';
import {
  selectAllTours,
  selectAllToursLength,
} from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';
import PageLoader from '@/components/Loaders/PageLoader';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';
import '@/styles/adminTours.css';
import '@/styles/ToursPage.css';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const allToursLength = useAppSelector(selectAllToursLength);
  const user = useAppSelector(selectUser);
  const toursPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTours, setCurrentTours] = useState<
    'all' | 'public' | 'unpublic'
  >('all');
  const t = useTranslations('metaTags');

  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const nPages = Math.ceil(allToursLength / toursPerPage);

  useEffect(() => {
    dispatch(
      fetchAdminTours({
        all: true,
        skip: indexOfFirstRecord,
        limit: toursPerPage,
      }),
    );
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>
          {t('tours_title')} {currentPage}
        </title>
        <meta name="description" content={t('tours_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div>
          <div className="container">
            <div style={{ margin: '100px auto 0 0' }}>
              <div className="buttons-admin-tour">
                <button
                  className={`btn-admin-fetch-tour btn-admin-all ${
                    currentTours === 'all' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(
                      fetchAdminTours({
                        all: true,
                        skip: indexOfFirstRecord,
                        limit: toursPerPage,
                      }),
                    );
                    setCurrentTours('all');
                  }}
                >
                  all
                </button>
                <button
                  className={`btn-admin-fetch-tour btn-admin-pub ${
                    currentTours === 'public' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(
                      fetchTours({
                        skip: indexOfFirstRecord,
                        limit: toursPerPage,
                      }),
                    );
                    setCurrentTours('public');
                  }}
                >
                  published
                </button>
                <button
                  className={`btn-admin-fetch-tour btn-admin-non-pub ${
                    currentTours === 'unpublic' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(
                      fetchAdminTours({
                        skip: indexOfFirstRecord,
                        limit: toursPerPage,
                      }),
                    );
                    setCurrentTours('unpublic');
                  }}
                >
                  non published
                </button>
              </div>
              {!tours || tours.length <= 0 ? (
                <div className="title-none-tour">
                  Unfortunately, there are no {currentTours} tours.
                </div>
              ) : (
                <div>
                  <div className="tours-admin-page">
                    {tours.map((tour) => (
                      <TourItem tour={tour} key={tour._id} isAdmin />
                    ))}
                  </div>
                  <div className="tours-page-paginate">
                    <Pagination
                      pathname={'/admin/tours/'}
                      nPages={nPages}
                      currentPage={currentPage}
                      onSetCurrentPage={onSetCurrentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllToursPage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
