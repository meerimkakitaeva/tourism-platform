import React from 'react';
import { showModal } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import { useAppDispatch } from '@/store/hooks';
import { TourFull } from '@/type';
import Image from 'next/image';

interface Props {
  tour: TourFull | null;
  currentImg: string;
  onLeftClick: (e: React.MouseEvent) => void;
  onRightClick: (e: React.MouseEvent) => void;
  onGalleryImgsClick: (src: string) => void;
}

const GalleryModal: React.FC<Props> = ({
  currentImg,
  tour,
  onLeftClick,
  onRightClick,
  onGalleryImgsClick,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`backdrop-gallery ${
        currentImg && currentImg.length !== 0 ? 'backdrop-gallery-open' : ''
      }`}
      onClick={() => dispatch(showModal(false))}
    >
      <div className="backdrop-gallery-btn">X</div>
      <div className="backdrop-gallery-mainImg">
        {tour && tour?.galleryTour.length > 1 ? (
          <div
            className="backdrop-gallery-icons backdrop-gallery-icon-left"
            onClick={(e) => onLeftClick(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="backdrop-gallery-icon-svg"
            >
              <path d="m12.718 4.707-1.413-1.415L2.585 12l8.72 8.707 1.413-1.415L6.417 13H20v-2H6.416l6.302-6.293z" />
            </svg>
          </div>
        ) : null}
        <Image
          width={800}
          height={0}
          quality={100}
          priority
          className="modal-img"
          src={currentImg}
          alt={currentImg}
          onClick={(e) => e.stopPropagation()}
        />
        {tour && tour?.galleryTour.length > 1 ? (
          <div
            className="backdrop-gallery-icons backdrop-gallery-icon-right"
            onClick={(e) => onRightClick(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="backdrop-gallery-icon-svg"
            >
              <path d="M11.293 4.707 17.586 11H4v2h13.586l-6.293 6.293 1.414 1.414L21.414 12l-8.707-8.707-1.414 1.414z" />
            </svg>
          </div>
        ) : null}
      </div>
      <div className="backdrop-gallery-inner">
        {tour && tour?.galleryTour.length > 1
          ? tour?.galleryTour.map((img, index) => (
              <div
                key={index}
                className={
                  currentImg === apiUrl + '/' + img
                    ? 'backdrop-gallery-img-current'
                    : ''
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onGalleryImgsClick(apiUrl + '/' + img);
                }}
              >
                <Image fill src={apiUrl + '/' + img} alt={img} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default GalleryModal;
