import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToursWithDiscountTours } from '@/containers/tours/toursSlice';
import { apiUrl } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import { fetchToursWithDiscountPrice } from '@/containers/tours/toursThunk';
import '@/styles/HotTours.css';

const HotToursToolbar = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectToursWithDiscountTours);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!tours.length) {
      dispatch(fetchToursWithDiscountPrice());
    }
  }, [dispatch, tours]);

  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div className="hot-tours-toolbar-wrap">
      <div className="hot-tours-toolbar">
        <div className="hot-tours-toolbar-inner">
          {tours.slice(0, 4).map((tour, index) => (
            <div
              className={`hot-tour-toolbar ${
                index === currentIndex
                  ? `hot-tours-toolbar-0`
                  : `hot-tour-toolbar-1`
              }`}
              key={tour._id}
            >
              <Image
                fill
                src={apiUrl + '/' + tour.mainImage}
                alt="..."
                className="hot-tour-toolbar-img"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="hot-tour-toolbar-sale">
                -
                {Math.ceil(
                  ((tour.price - tour.discountPrice) / tour.price) * 100,
                )}
                %
              </div>
              <div className="hot-tour-toolbar-info">
                <Link
                  href={`/tours/${tour._id}`}
                  className="hot-tour-toolbar-link"
                >
                  <h4>{tour.name}</h4>
                </Link>
                <div onClick={(e) => e.stopPropagation()}>
                  <span className="hot-tour-toolbar-old-price">
                    ${tour.price}
                  </span>
                  <span className="hot-tour-toolbar-price">
                    ${tour.discountPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="hot-tours-toolbar-dots"
          onClick={(e) => e.stopPropagation()}
        >
          {tours.slice(0, 4).map((tour, index) => (
            <div
              className={
                currentIndex === index
                  ? 'hot-tours-toolbar-dot-active'
                  : 'hot-tours-toolbar-dot-hide'
              }
              key={tour._id}
              id={index.toString()}
              onClick={(e) => goToSlide(index, e)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotToursToolbar;
