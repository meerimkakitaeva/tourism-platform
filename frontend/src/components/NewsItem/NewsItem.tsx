import React from 'react';
import { INews } from '@/type';
import { apiUrl, userRoles } from '@/constants';
import { Fade } from 'react-awesome-reveal';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import {
  deleteNews,
  fetchNews,
  publishNews,
} from '@/containers/news/newsThunk';
import { selectDeleteTourLoading } from '@/containers/tours/toursSlice';
import { selectNewsPublishLoading } from '@/containers/news/newsSlice';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import '@/styles/admin-buttons.css';

interface Props {
  news: INews;
}

const NewsItem: React.FC<Props> = ({ news }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const publishLoading = useAppSelector(selectNewsPublishLoading);
  const deleteLoading = useAppSelector(selectDeleteTourLoading);
  const t = useTranslations('news');
  const a = useTranslations('alert');

  const onDelete = async () => {
    if (window.confirm(a('delete_news'))) {
      await dispatch(deleteNews(news._id));
      dispatch(fetchNews());
    }
  };

  const onPublish = async () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          news.isPublished ? 'un' : ''
        }publish this news?`,
      )
    ) {
      await dispatch(publishNews(news._id));
      dispatch(fetchNews());
    }
  };

  return (
    <Fade>
      <div className="card-news-img">
        <Link href={`/news/${news._id}`}>
          <div className="card-news-img-wrap">
            <Image fill src={apiUrl + '/' + news.images[0]} alt={news.title} />
          </div>
        </Link>
        {user && user.role === userRoles.admin ? (
          <div className="admin-buttons" style={{ margin: 10 }}>
            <button
              className="admin-button admin-button-add"
              type="button"
              onClick={onPublish}
              disabled={publishLoading ? publishLoading === news._id : false}
            >
              {publishLoading && publishLoading === news._id
                ? !news.isPublished
                  ? t('news_all_unpublish_loading')
                  : t('news_all_publish_loading')
                : !news.isPublished
                  ? t('news_all_publish')
                  : t('news_all_unpublish')}
            </button>
            <Link
              href={`/news/edit/${news._id}`}
              className="admin-button admin-button-outline admin-button-edit"
            >
              <AdminIcon type="edit" />
            </Link>
            <button
              className="admin-button admin-button-outline admin-button-delete"
              type="button"
              onClick={onDelete}
              disabled={deleteLoading ? deleteLoading === news._id : false}
            >
              <AdminIcon type="delete" />
              {deleteLoading && deleteLoading === news._id
                ? t('news_all_delete_loading')
                : null}
            </button>
          </div>
        ) : null}
        <div className="card-news-date">
          {dayjs(news.date).format('DD.MM.YYYY')}
        </div>
        <hr className="card-news-line" />
        <Link href={`/news/${news._id}`} className="news-item-link">
          <div className="one-news-title">{news.title || '-'}</div>
        </Link>
      </div>
    </Fade>
  );
};

export default NewsItem;
