import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllNews } from '@/containers/news/newsSlice';
import { fetchNews } from '@/containers/news/newsThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import NewsItem from '@/components/NewsItem/NewsItem';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { GetServerSideProps } from 'next';
import '@/styles/NewsPage.css';
import '@/styles/ToursPage.css';
import '@/styles/admin-buttons.css';
import Head from 'next/head';

const AllNewsPage = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectAllNews);
  const user = useAppSelector(selectUser);
  const [newsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations('news');
  const metaT = useTranslations('metaTags');

  const indexOfLastRecord = currentPage * newsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - newsPerPage;
  const currentRecords = news.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(news.length / newsPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(false));
    dispatch(fetchNews());
  }, [dispatch]);

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>
          {metaT('news_title')} - {currentPage}
        </title>
        <meta name="description" content={metaT('news_title')} />
      </Head>
      <div className="news-page">
        <PageLoader />
        <div className="news-top">
          <div className="news-top-bg" />
          <div className="news-top-info">
            <h2 className="news-top-title">{t('news_all_news_title')}</h2>
            <p className="news-top-txt">{t('news_all_news_description')}</p>
          </div>
        </div>
        <div className="container">
          <div className="news-main">
            {user && user.role === userRoles.admin ? (
              <Link
                href="/news/create"
                className="admin-button admin-button-add"
                style={{ width: '20%', margin: '0 auto 60px auto' }}
              >
                <AdminIcon type="add" />
                {t('news_all_create_news')}
              </Link>
            ) : null}
            <div className="news-main-inner">
              {currentRecords.map((news) => (
                <div className="card-news" key={news._id}>
                  <NewsItem news={news} key={news._id} />
                </div>
              ))}
            </div>
            <div className="news-pagination">
              <Pagination
                pathname={'/news/all/'}
                nPages={nPages}
                currentPage={currentPage}
                onSetCurrentPage={onSetCurrentPage}
              />
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
