import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectGuides } from '@/containers/guides/guidesSlice';
import { fetchGuides } from '@/containers/guides/guidesThunk';
import GuideItem from '@/components/GuideItem/GuideItem';
import { apiUrl } from '@/constants';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const GuideSlider = () => {
  const dispatch = useAppDispatch();
  const guides = useAppSelector(selectGuides);

  useEffect(() => {
    dispatch(fetchGuides());
  }, [dispatch]);

  return (
    <>
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: '.swiper-pagination',
        }}
        breakpoints={{
          950: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <div className="slider-slides-wrap">
          {guides.map((guide, index) => (
            <SwiperSlide key={index}>
              <GuideItem
                id={guide._id}
                name={guide.user.displayName}
                role={'Guide'}
                description={guide.description}
                imageUrl={apiUrl + '/' + guide.user.avatar}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      <div className="swiper-pagination"></div>
    </>
  );
};

export default GuideSlider;
