import React from 'react';
import { Tour } from '@/type';
import { apiUrl } from '@/constants';
import NavLink from 'next/link';
import Image from 'next/image';

interface Props {
  tour: Tour;
}

const HotToursItem: React.FC<Props> = ({ tour }) => {
  const discount = ((tour.price - tour.discountPrice) / tour.price) * 100;

  return (
    <div className="hot-tours-item">
      <NavLink href={`/tours/${tour._id}`} className="hot-tours-item-preview">
        <Image fill sizes="" src={apiUrl + '/' + tour.mainImage} alt="..." />
        <div className="hot-tours-item-badge">-{Math.ceil(discount)}%</div>
      </NavLink>
      <div className="hot-tours-item-info">
        <p className="hot-tours-item-title">
          <NavLink
            href={`/tours/${tour._id}`}
            className="hot-tours-item-title-link"
          >
            {tour.name}
          </NavLink>
        </p>
        <div className="hot-tours-item-pricing">
          <p className="hot-tours-item-price hot-tours-item-price-old">
            {tour.price} KGS
          </p>
          <p className="hot-tours-item-price hot-tours-item-price-new">
            {tour.discountPrice} KGS
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotToursItem;
