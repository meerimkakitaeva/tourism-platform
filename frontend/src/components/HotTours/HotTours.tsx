import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectToursWithDiscountTours } from '@/containers/tours/toursSlice';
import HotToursItem from '@/components/HotTours/components/HotToursItem/HotToursItem';
import arrowRightIcon from '@/assets/images/arrow-right.svg';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Tour } from '@/type';
import '@/styles/HotTours.css';

const HotTours = () => {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(selectToursWithDiscountTours);

  const carouselRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations('main');

  const [carouselTours, setCarouselTours] = useState<Tour[]>([]);

  useEffect(() => {
    if (tours.length && !carouselTours.length) {
      setCarouselTours([...tours]);
    }
  }, [tours, carouselTours]);

  const slide = useCallback(
    (isNext?: boolean) => {
      if (!carouselRef.current || !tours.length) return;
      if (isNext === undefined) isNext = true;

      const ms = 250;

      const x = carouselRef.current.children[0].clientWidth + 30;

      carouselRef.current.style.cssText = `
        transition: all ${ms}ms ease 0s;
        transform: translateX(${isNext ? '-' : ''}${x}px);
      `;

      setTimeout(() => {
        if (!carouselRef.current) return;

        carouselRef.current.style.cssText = `
            transition: none;
            transform: translateX(0);
          `;

        setCarouselTours((prevState) => {
          const newState = [...prevState];

          if (isNext) newState.push(newState.shift()!);
          else newState.unshift(newState.pop()!);

          return newState;
        });
      }, ms);
    },
    [tours],
  );

  useEffect(() => {
    let interval = setInterval(slide, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [slide]);

  return (
    <div className="hot-tours-wrapper">
      <div className="container hot-tours-wrapper-inner">
        <div className="hot-tours-carousel">
          <div className="hot-tours-carousel-inner-wrapper">
            <div className="hot-tours-carousel-inner">
              <div className="hot-tours-carousel-inner-items" ref={carouselRef}>
                {carouselTours.map((tour) => (
                  <HotToursItem tour={tour} key={`hot-tour-${tour._id}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="hot-tours-carousel-buttons">
            <button
              className="hot-tours-carousel-buttons-next"
              onClick={() => slide(true)}
            >
              <div>
                <Image fill src={arrowRightIcon.src} alt="arrow-right-icon" />
              </div>
            </button>
            <button
              className="hot-tours-carousel-buttons-prev"
              onClick={() => slide(false)}
            >
              <div>
                <Image fill src={arrowRightIcon.src} alt="arrow-left-icon" />
              </div>
            </button>
          </div>
        </div>
        <div className="hot-tours-info">
          <div>
            <h2>
              {t('hot_tours_last')}
              <br />
              {t('hot_tours_min')}
            </h2>
            <p>{t('hot_tours_offer')}</p>
          </div>
          <h4>{t('hot_tours_text')}!</h4>
        </div>
      </div>
    </div>
  );
};

export default HotTours;
