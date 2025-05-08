import React, { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTours } from '@/containers/tours/toursThunk';
import {
  selectAllTours,
  selectAllToursLength,
} from '@/containers/tours/toursSlice';
import TourItem from '@/components/TourListItem/TourListItem';
import PageLoader from '@/components/Loaders/PageLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import TourFilter from '@/components/Filters/TourFilter';
import { GetServerSideProps } from 'next';
import '@/styles/ToursPage.css';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const AllToursPage = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectAllTours);
  const allToursLength = useAppSelector(selectAllToursLength);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;
  const indexOfLastRecord = currentPage * toursPerPage;
  const indexOfFirstRecord = indexOfLastRecord - toursPerPage;
  const nPages = Math.ceil(allToursLength / toursPerPage);
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(
      fetchTours({
        skip: indexOfFirstRecord,
        limit: toursPerPage,
      }),
    );
  }, [dispatch, currentPage, indexOfFirstRecord]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>{metaT('tours_title')}</title>
        <meta name="description" content={metaT('tours_desc')} />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div className="fixed-toolbar"></div>

        <TourFilter />
        <div className="container">
          <div>
            <div>
              <div className="tours-page">
                {tours.map((tour) => (
                  <TourItem tour={tour} key={tour._id} />
                ))}
              </div>
              <div className="tours-page-paginate">
                <Pagination
                  pathname={'/tours/all/'}
                  nPages={nPages}
                  currentPage={currentPage}
                  onSetCurrentPage={onSetCurrentPage}
                />
              </div>
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
