import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectOrdersUser } from '@/containers/orders/ordersSlice';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import '@/styles/UserOrder.css';

const UserOrders = () => {
  const orders = useAppSelector(selectOrdersUser);
  const t = useTranslations('myProfile');
  return (
    <div className="orders-list">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="orders">
            <h4 className="orders_tour">
              {t('tour')}: {order.tour.name}
            </h4>
            <p className="orders_guide">
              {t('guide')}:{' '}
              {order.guide ? order.guide.user.displayName : 'Unknown'}
            </p>
            <p className="orders_datetime">
              {t('date')}:{' '}
              {dayjs(order.datetime).format('DD.MM.YY HH:MM') || '-'}
            </p>
            <p className="orders_date">
              {t('date_tour')}:{' '}
              {dayjs(order.date).format('DD.MM.YY HH:MM') || '-'}
            </p>
            <p className="orders_price">
              {t('price')}: {order.price}KGS
            </p>
            <div className="orders_status">
              {t('status')}: {order.status}
            </div>
          </div>
        ))
      ) : (
        <span>{t('no_orders')}</span>
      )}
    </div>
  );
};

export default UserOrders;
