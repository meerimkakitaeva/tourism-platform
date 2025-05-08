import React, { useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import Pagination from '@/components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { setIsLightMode } from '@/containers/config/configSlice';
import { selectAllPartnerOrders } from '@/containers/partners/partnersSlice';
import { fetchPartnerOrders } from '@/containers/partners/partnersThunk';
import PartnerOrderItem from '@/components/PartnerOrderItem/PartnerOrderItem';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/NewsPage.css';
import '@/styles/adminTours.css';
import Head from 'next/head';

const AllPartnerOrdersPage = () => {
  const dispatch = useAppDispatch();
  const partnerOrders = useAppSelector(selectAllPartnerOrders);
  const user = useAppSelector(selectUser);
  const [ordersPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations('partnerOrders');
  const metaT = useTranslations('metaTags');

  const indexOfLastRecord = currentPage * ordersPerPage;
  const indexOfFirstRecord = indexOfLastRecord - ordersPerPage;
  const currentRecords = partnerOrders.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const nPages = Math.ceil(partnerOrders.length / ordersPerPage);

  useEffect(() => {
    dispatch(setIsLightMode(true));
    dispatch(fetchPartnerOrders());
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onSetCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>{metaT('partner_orders_title')}</title>
        <meta name="description" content={metaT('partner_orders_desc')} />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div>
          <div className="container">
            <div className="buttons-admin-tour">
              {!partnerOrders || partnerOrders.length <= 0 ? (
                <div className="title-none-tour">{t('noPartnersMessage')}</div>
              ) : (
                <div>
                  <div className="tours-admin-page">
                    {currentRecords.map((orders) => (
                      <div className="card-news" key={orders._id}>
                        <PartnerOrderItem
                          id={orders._id}
                          name={orders.name}
                          message={orders.message}
                          number={orders.number}
                          link={orders.link}
                          image={orders.image}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="tours-page-paginate">
                    <Pagination
                      pathname={'/admin/partnerOrders/'}
                      nPages={nPages}
                      currentPage={currentPage}
                      onSetCurrentPage={onSetCurrentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPartnerOrdersPage;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
