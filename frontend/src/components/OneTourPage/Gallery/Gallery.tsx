import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  galleryModal,
  selectOneTour,
  showModal,
} from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import GalleryItem from '@/components/OneTourPage/Gallery/GalleryItem';
import GalleryModal from '@/components/OneTourPage/Gallery/GalleryModal';
import { useTranslations } from 'next-intl';
import '@/styles/Gallery.css';

const Gallery = () => {
  const tour = useAppSelector(selectOneTour);
  const modal = useAppSelector(galleryModal);
  const dispatch = useAppDispatch();
  const [currentImg, setCurrentImg] = useState('');
  const t = useTranslations('oneTour');

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
      <div className="one-tour-gallery">
        <h2>{t('tour_gallery')}</h2>
        <div className="one-tour-photos">
          <GalleryItem tour={tour} onOpenModal={onOpenModal} />
        </div>
      </div>
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

export default Gallery;
