import React, { useEffect, useRef, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { selectAllNews } from '@/containers/news/newsSlice';
import NewsItem from '@/components/NewsItem/NewsItem';
import { fetchAdminNews } from '@/containers/news/newsThunk';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';
import '@/styles/adminTours.css';
import '@/styles/NewsPage.css';
import '@/styles/ToursPage.css';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

const AllNewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  const user = useAppSelector(selectUser);
  const [newsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentNews, setCurrentNews] = useState<'all' | 'public' | 'unpublic'>(
    'all',
  );

  const t = useTranslations('metaTags');

  const indexOfLastRecord = currentPage * newsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - newsPerPage;
  const currentRecords = news.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(news.length / newsPerPage);

  useEffect(() => {
    dispatch(fetchAdminNews('all'));
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
        <title>{t('news_title')}</title>
        <meta name="description" content={t('news_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div>
          <div className="container">
            <div>
              <div className="buttons-admin-tour">
                <button
                  className={`btn-admin-fetch-tour btn-admin-all ${
                    currentNews === 'all' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(fetchAdminNews('all'));
                    setCurrentNews('all');
                  }}
                >
                  all
                </button>
                <button
                  className={`btn-admin-fetch-tour btn-admin-pub ${
                    currentNews === 'public' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(fetchAdminNews());
                    setCurrentNews('public');
                  }}
                >
                  published
                </button>
                <button
                  className={`btn-admin-fetch-tour btn-admin-non-pub ${
                    currentNews === 'unpublic' && 'focus'
                  }`}
                  type="button"
                  onClick={async () => {
                    await dispatch(fetchAdminNews('private'));
                    setCurrentNews('unpublic');
                  }}
                >
                  non published
                </button>
              </div>
              {!news || news.length <= 0 ? (
                <div className="title-none-tour">
                  Unfortunately, there are no {currentNews} news.
                </div>
              ) : (
                <div>
                  <div className="tours-admin-page">
                    {currentRecords.map((news) => (
                      <div className="card-news" key={news._id}>
                        <NewsItem news={news} key={news._id} />
                      </div>
                    ))}
                  </div>
                  <div className="tours-page-paginate">
                    <Pagination
                      pathname={'/admin/news/'}
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

export default AllNewsPage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
