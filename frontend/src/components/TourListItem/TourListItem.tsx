import React from 'react';
import { Tour } from '@/type';
import Link from 'next/link';
import { Fade } from 'react-awesome-reveal';
import { apiUrl, userRoles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import {
  deleteTour,
  fetchTours,
  publishTour,
} from '@/containers/tours/toursThunk';
import {
  selectDeleteTourLoading,
  selectTourPublishLoading,
} from '@/containers/tours/toursSlice';
import Image from 'next/image';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import '@/styles/TourItem.css';
import '@/styles/admin-buttons.css';
import { useTranslations } from 'next-intl';

interface Props {
  tour: Tour;
  isAdmin?: boolean;
}

const TourItem: React.FC<Props> = ({ tour, isAdmin }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const imgLink = apiUrl + '/' + tour.mainImage;
  const publishLoading = useAppSelector(selectTourPublishLoading);
  const deleteLoading = useAppSelector(selectDeleteTourLoading);
  const a = useTranslations('alert');
  const onDelete = async () => {
    if (window.confirm(a('delete_tour'))) {
      await dispatch(deleteTour(tour._id));
      dispatch(fetchTours());
    }
  };

  const onPublish = async () => {
    if (window.confirm(a('publish_tour'))) {
      await dispatch(publishTour(tour._id));
      dispatch(fetchTours());
    }
  };

  const discount = ((tour.price - tour.discountPrice) / tour.price) * 100;

  return (
    <Fade>
      <div className="tour-item" id={tour._id}>
        <Link href={`/tours/${tour._id}`} className="tour-item-top">
          <Image fill src={imgLink} alt={tour.name} className="tour-item-img" />
          {tour.discountPrice && (
            <div className="tour-item-discount">-{Math.ceil(discount)}%</div>
          )}

          <div
            className={`tour-item-price ${
              tour.discountPrice ? 'tour-item-discount-price' : ''
            }`}
          >
            {tour.discountPrice && (
              <span className="tour-item-old-price">{tour.price} KGS</span>
            )}
            {tour.discountPrice ?? tour.price} KGS
          </div>
        </Link>
        {tour.guides && tour.guides.length > 0 ? (
          <Link
            href={`/guides/${tour.guides[0]._id}`}
            className="tour-item-guide-avatar"
          >
            <Image
              fill
              src={
                tour.guides[0].user.avatar &&
                tour.guides[0].user.avatar.startsWith('http')
                  ? tour.guides[0].user.avatar
                  : apiUrl + '/' + tour.guides[0].user.avatar
              }
              alt="guide"
            />
          </Link>
        ) : null}
        <div className="tour-item-bottom">
          <Link href={`/tours/${tour._id}`} className="tour-item-links">
            <h2 className="tour-item-title">{tour.name}</h2>
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="tour-item-country">{tour.country}</div>
            <div className="tour-item-info">
              <div className="tour-item-duration">{tour.duration} days</div>
            </div>
          </div>
          {isAdmin && user && user.role === userRoles.admin ? (
            <div className="admin-buttons">
              <button
                className="admin-button admin-button-add"
                type="button"
                onClick={onPublish}
                disabled={publishLoading ? publishLoading === tour._id : false}
              >
                {publishLoading && publishLoading === tour._id
                  ? tour.isPublished
                    ? 'unpublishing...'
                    : 'publishing...'
                  : tour.isPublished
                    ? 'Unpublish'
                    : 'Publish'}
              </button>
              <Link
                href={`/tours/edit/${tour._id}`}
                className="admin-button admin-button-outline admin-button-edit"
              >
                <AdminIcon type="edit" />
              </Link>
              <button
                className="admin-button admin-button-outline admin-button-delete"
                type="button"
                onClick={onDelete}
                disabled={deleteLoading ? deleteLoading === tour._id : false}
              >
                <AdminIcon type="delete" />
                {deleteLoading && deleteLoading === tour._id
                  ? 'deleting...'
                  : null}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Fade>
  );
};

export default TourItem;
