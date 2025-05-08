import React, { useEffect } from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllNews, selectOneNews } from '@/containers/news/newsSlice';
import { fetchNews, fetchOneNews } from '@/containers/news/newsThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import { apiUrl } from '@/constants';
import dayjs from 'dayjs';
import { INews } from '@/type';
import Link from 'next/link';
import { setIsLightMode } from '@/containers/config/configSlice';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const OneNews: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { id } = useParams() as {
    id: string;
  };
  const dispatch = useAppDispatch();
  const oneNews = useAppSelector(selectOneNews);
  const allNews = useAppSelector(selectAllNews);
  const t = useTranslations('news');

  useEffect(() => {
    dispatch(setIsLightMode(false));
    dispatch(fetchOneNews(id));
    dispatch(fetchNews());
  }, [dispatch, id]);

  if (!oneNews) return <div>No such news!</div>;

  const arr: INews[] = [];

  allNews.map((news) => {
    if (
      news.category[0] === oneNews.category[0] &&
      news.title !== oneNews.title
    ) {
      arr.push(news);
    }
  });

  const items = arr.map((news) => (
    <div key={news.title} className="one-news-main-right-related-cards">
      <div>
        <Image
          width={100}
          height={100}
          src={apiUrl + '/' + news.images[0]}
          alt={news.title}
        />
      </div>
      <Link
        href={`/news/${news._id}`}
        className="one-news-main-right-related-cards-link"
      >
        <div className="one-news-main-right-related-cards-title">
          {news.title}
        </div>
      </Link>
    </div>
  ));

  return (
    <>
      <Head>
        <title>{oneNews.title}</title>
        <meta name="description" content={oneNews.description} />
      </Head>
      <div className="one-news-page">
        <PageLoader />
        <div className="news-top">
          <Image
            fill
            src={apiUrl + '/' + oneNews.images[0]}
            className="news-main-img"
            alt={oneNews.title}
          />
          <div className="news-top-info">
            <div className="news-top-line"></div>
            <h2 className="news-top-title">{oneNews.title || '-'}</h2>
          </div>
        </div>
        <div className="container">
          <div className="one-news-main">
            <div className="one-news-main-left">
              <div className="one-news-main-info">
                <div className="one-news-main-info-date">
                  {dayjs(oneNews.date).format('DD.MM.YYYY')}
                </div>
                <div className="one-news-main-info-category">
                  {t('news_categories')}: {oneNews.category.join(', ')}
                </div>
              </div>
              <div className="one-news-main-description">
                {oneNews.description || '-'}
              </div>
              <div className="one-news-main-imgs">
                {oneNews.images.map((newsImg) => (
                  <Image
                    width={200}
                    height={200}
                    src={apiUrl + '/' + newsImg}
                    key={newsImg}
                    alt={newsImg}
                  />
                ))}
              </div>
            </div>
            <div className="one-news-main-right">
              <div className="one-news-categories">
                <h2 className="one-news-main-right-title">
                  {t('news_categories')}
                </h2>
                <div>
                  <div className="one-news-main-right-categories">Places</div>
                  <div className="one-news-main-right-categories">Animals</div>
                  <div className="one-news-main-right-categories">Clothes</div>
                  <div className="one-news-main-right-categories">Borders</div>
                </div>
              </div>
              <div className="one-news-related">
                <h2 className="one-news-main-right-related">
                  {t('news_related_news')}
                </h2>
                {arr.length === 0 ? (
                  <div>{t('news_no_related_news')}</div>
                ) : (
                  items
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneNews;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
