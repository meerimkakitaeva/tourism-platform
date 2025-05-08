import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import {
  galleryModal,
  selectOneTour,
  showModal,
} from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import GalleryItem from '@/components/OneTourPage/Gallery/GalleryItem';
import GalleryModal from '@/components/OneTourPage/Gallery/GalleryModal';
import { useTranslations } from 'next-intl';
import '@/styles/OneTourInformation.css';

const OneTourInformation = () => {
  const tour = useAppSelector(selectOneTour);
  const modal = useAppSelector(galleryModal);
  const dispatch = useAppDispatch();
  const [currentImg, setCurrentImg] = useState('');
  const t = useTranslations('oneTour');

  if (!tour) return null;

  const onOpenModal = (e: React.MouseEvent) => {
    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    dispatch(showModal(true));
  };
  const onLeftClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    let index = 0;

    tour?.galleryTour.forEach((t, i) => {
      if (currentImg === apiUrl + '/' + t) {
        index = i - 1;
      }
    });

    if (index >= 0) {
      setCurrentImg(apiUrl + '/' + tour?.galleryTour[index]);
    } else {
      setCurrentImg(currentImg);
    }
  };

  const onRightClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const src = e.currentTarget.getAttribute('src')!;
    setCurrentImg(src);
    let index = 0;

    tour?.galleryTour.forEach((t, i) => {
      if (currentImg === apiUrl + '/' + t) {
        index = i + 1;
      }
    });

    if (index >= 0 && index < tour?.galleryTour.length!) {
      setCurrentImg(apiUrl + '/' + tour?.galleryTour[index]);
    } else {
      setCurrentImg(currentImg);
    }
  };

  return (
    <>
      <Fade>
        <div className="one-tour-inner">
          <h3 className="one-tour-inner-title">{tour.name}</h3>
          <div className="one-tour-inner-price-wrap">
            <div className="one-tour-inner-prices">
              {tour.discountPrice && (
                <span className="one-tour-inner-discount-price">
                  {tour.price} KGS
                </span>
              )}
              <span className="one-tour-inner-price">
                {tour.discountPrice ?? tour.price} KGS
              </span>
            </div>
            {t('per_person')}
          </div>
          <div className="one-tour-inner-info">
            <div className="one-tour-inner-duration">
              {tour.duration + ' ' + t('tour_duration')}
            </div>
            <div className="one-tour-inner-featur">{t('featured_tour')}</div>
          </div>
          <div className="one-tour-inner-txt">{tour.description}</div>
          <div className="one-tour-inner-box">
            <table className="one-tour-inner-table">
              <tbody>
                <tr>
                  <td>{t('tour_country')}</td>
                  <td>{tour.country}</td>
                </tr>
                <tr>
                  <td>{t('tour_destination')}</td>
                  <td>{tour.destination}</td>
                </tr>
                <tr>
                  <td>{t('tour_arrival')}</td>
                  <td>{tour.arrival}</td>
                </tr>
                <tr>
                  <td>{t('tour_date')}</td>
                  <td>{tour.date}</td>
                </tr>
                <tr>
                  <td>{t('tour_departure')}</td>
                  <td>{tour.departure}</td>
                </tr>
                <tr>
                  <td>{t('tour_included')}</td>
                  <td>
                    <ul className="one-tour-inner-table-list">
                      {tour.included.map((inc, id) => (
                        <li key={id}>{inc}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>{t('tour_dressCode')}</td>
                  <td>{tour.dressCode}</td>
                </tr>
                <tr>
                  <td>{t('tour_guides')}</td>
                  <td>
                    {tour.guides.length > 0 ? (
                      tour.guides.map((guide) => (
                        <div key={guide._id}>{guide.user.displayName}</div>
                      ))
                    ) : (
                      <div>-</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>{t('tour_category')}</td>
                  <td>{tour.category.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="one-tour-inner-gallery">
            <h3>{t('tour_gallery')}</h3>
            <div className="one-tour-inner-gallery2">
              <GalleryItem tour={tour} onOpenModal={onOpenModal} />
            </div>
          </div>
        </div>
      </Fade>
      {modal ? (
        <GalleryModal
          tour={tour}
          currentImg={currentImg}
          onLeftClick={onLeftClick}
          onRightClick={onRightClick}
          onGalleryImgsClick={setCurrentImg}
        />
      ) : null}
    </>
  );
};

export default OneTourInformation;
