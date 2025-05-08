import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { selectGuides } from '@/containers/guides/guidesSlice';
import { fetchAdminGuides } from '@/containers/guides/guidesThunk';
import { apiUrl, userRoles } from '@/constants';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import GuideItem from '@/components/GuideItem/GuideItem';
import Custom404 from '@/pages/404';
import GuideFilter from '@/components/Filters/GuideFilter';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';
import '@/styles/NewsPage.css';
import '@/styles/adminTours.css';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const AllGuidesPage = () => {
  const dispatch = useAppDispatch();
  const guides = useAppSelector(selectGuides);
  const user = useAppSelector(selectUser);
  const [guidesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * guidesPerPage;
  const indexOfFirstRecord = indexOfLastRecord - guidesPerPage;
  const currentRecords = guides.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(guides.length / guidesPerPage);
  const t = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAdminGuides());
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
        <title>{t('guides_title')}</title>
        <meta name="description" content={t('guides_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div className="fixed-toolbar"></div>

        <GuideFilter />
        <div>
          <div className="container">
            <div>
              <div className="guides-admin-page">
                {currentRecords.map((guide) => (
                  <div className="card-news" key={guide._id}>
                    <GuideItem
                      id={guide._id}
                      name={guide.user.username}
                      role={guide.user.role}
                      description={guide.description}
                      imageUrl={apiUrl + '/' + guide.user.avatar}
                    />
                  </div>
                ))}
              </div>
              <div className="tours-page-paginate">
                <Pagination
                  pathname={'/admin/guides/'}
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

export default AllGuidesPage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
