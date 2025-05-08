import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAllOrders,
  selectOrderStatusChanging,
  setMessages,
} from '@/containers/orders/ordersSlice';
import {
  changeOrderStatus,
  deleteOrder,
  fetchOrders,
  sendOrderEmailToTheUser,
} from '@/containers/orders/ordersThunk';
import { IOrder2 } from '@/type';
import PageLoader from '@/components/Loaders/PageLoader';
import axiosApi from '@/axiosApi';
import dayjs from 'dayjs';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { boardNames, userRoles } from '@/constants';
import { useRouter } from 'next/router';
import { setIsLightMode } from '@/containers/config/configSlice';
import { GetServerSideProps } from 'next';
import '@/styles/allOrders.css';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const AllOrders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllOrders);
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const t = useTranslations('admin');
  const tr = useTranslations('orders');
  const metaT = useTranslations('metaTags');
  const bookedOrders = orders.filter((order) => order.status === 'booked');
  const underConsiderOrders = orders.filter(
    (order) => order.status === 'being considered',
  );
  const approvedOrders = orders.filter((order) => order.status === 'approved');
  const [currentOrder, setCurrentOrder] = useState({
    id: '',
    boardName: '',
  });
  const orderChangerLoading = useAppSelector(selectOrderStatusChanging);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    if (!user || user.role !== userRoles.moderator) {
      void router.push('/');
    }

    let datetime = new Date().toISOString();
    dispatch(fetchOrders());

    if (orders.length) {
      datetime = orders[orders.length - 1].datetime;
    }
    const interval = setInterval(async () => {
      await axiosApi<IOrder2[]>(`orders/?datetime=${datetime}`).then((res) => {
        if (res.data.length) {
          dispatch(setMessages(res.data));
          datetime = res.data[res.data.length - 1].datetime;
        }
      });
    }, 12000);

    return () => {
      clearInterval(interval);
    };
    // Do NOT add "orders" as dependency, otherwise recursion starts!
  }, [dispatch, user, router]);

  const onDelete = async (id: string) => {
    if (window.confirm(tr('removeAlert'))) {
      await dispatch(deleteOrder(id));
      dispatch(addAlert({ message: tr('message'), type: 'info' }));
      dispatch(fetchOrders());
    }
  };

  const dragStartHandler = (id: string, boardName: string) => {
    setCurrentOrder({ id, boardName });
  };

  const dropHandler = async (boardName: string) => {
    if (currentOrder.boardName === boardName) return;
    await dispatch(
      changeOrderStatus({ id: currentOrder.id, status: boardName }),
    );
    dispatch(fetchOrders());
    dragStartHandler('', '');
  };

  const onOrderClick = (orderId: string, orderStatus: string) => {
    if (!currentOrder.id) {
      dragStartHandler(orderId, orderStatus);
      return;
    }
    dragStartHandler('', '');
  };

  const sendEmail = async (e: React.MouseEvent, order: IOrder2) => {
    e.stopPropagation();

    try {
      await dispatch(sendOrderEmailToTheUser(order._id)).unwrap();
      dispatch(fetchOrders());
    } catch (e) {
      // nothing
    }
  };

  const orderTitle = [t('booked'), t('being considered'), t('approved')];

  return (
    <>
      <Head>
        <title>{metaT('orders_title')}</title>
        <meta name="description" content={metaT('orders_title')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container" onClick={() => dragStartHandler('', '')}>
        <PageLoader />
        <div className="orders-page">
          <h2 className="orders-title">{t('orders')}</h2>
          <div className="boards">
            {boardNames.map((boardName) => (
              <div
                className="order-board"
                key={boardName}
                onClick={() => {
                  if (currentOrder.id) {
                    if (currentOrder.boardName !== boardName) {
                      void dropHandler(boardName);
                    }
                  }
                }}
              >
                <h4 className="board-title">
                  {orderTitle[boardNames.indexOf(boardName)] ||
                    boardName[0].toUpperCase() + boardName.slice(1)}
                </h4>
                <div
                  className="order-items"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => dropHandler(boardName)}
                >
                  {(boardName === 'booked'
                    ? bookedOrders
                    : boardName === 'being considered'
                      ? underConsiderOrders
                      : boardName === 'approved'
                        ? approvedOrders
                        : []
                  ).map((order) => (
                    <div
                      className={`order-item ${
                        currentOrder.id === order._id ? 'order-selected' : ''
                      }`}
                      key={order._id}
                      draggable={true}
                      onDragStart={() =>
                        dragStartHandler(order._id, order.status)
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => e.preventDefault()}
                      onDragLeave={(e) => e.preventDefault()}
                      onDragEnd={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!currentOrder.id) {
                          void onOrderClick(order._id, order.status);
                          return;
                        }
                        dragStartHandler('', '');
                        if (currentOrder.boardName !== boardName) {
                          void dropHandler(boardName);
                        }
                      }}
                    >
                      {orderChangerLoading && currentOrder.id === order._id && (
                        <div className="order-status-loading">
                          <span className="order-status-loading-inner" />
                        </div>
                      )}
                      <span
                        className="remove-order"
                        onClick={(e) => {
                          e.stopPropagation();
                          void onDelete(order._id);
                        }}
                      >
                        &#215;
                      </span>
                      {order.status === 'approved' && !order.isSendEmail && (
                        <span
                          className="send-email-order"
                          onClick={(e) => sendEmail(e, order)}
                        ></span>
                      )}
                      <span className="order-datetime">
                        {dayjs(order.datetime).format('DD.MM.YY HH:MM') || '-'}
                      </span>
                      <div className="user-info-row">
                        <span>{order.email || order.user?.email || '-'}</span>
                        <span>{order.phone || '-'}</span>
                      </div>
                      <div className="user-info-row">
                        <span>{order.tour.name || '-'}</span>
                        <span>{order.price + 'kgs' || '-'}</span>
                      </div>
                      <div className="user-info-row">
                        <span className="order-date">
                          {(() => {
                            const date = dayjs(order.date).format('DD.MM.YY');
                            return date === 'Invalid Date' ? order.date : date;
                          })() || '-'}
                        </span>
                      </div>
                      <div className="user-info-row">
                        <span>
                          {order.guide ? order.guide.user.displayName : '-'}
                        </span>
                        <span>
                          {order.guide ? order.guide.user.email : '-'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrders;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
