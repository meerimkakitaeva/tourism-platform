import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllPartners } from '@/containers/about/aboutSlice';
import { fetchPartners } from '@/containers/about/aboutThunk';
import { setIsLightMode } from '@/containers/config/configSlice';
import PageLoader from '@/components/Loaders/PageLoader';
import Link from 'next/link';
import { apiUrl, userRoles } from '@/constants';
import { deletePartner } from '@/containers/partners/partnersThunk';
import Custom404 from '@/pages/404';
import { selectUser } from '@/containers/users/usersSlice';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/admin-buttons.css';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import Head from 'next/head';

const Partners = () => {
  const dispatch = useAppDispatch();
  const partners = useAppSelector(selectAllPartners);
  const user = useAppSelector(selectUser);
  const t = useTranslations('partnerOrders');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  const onDelete = async (id: string) => {
    if (window.confirm(t('deleteAlert'))) {
      await dispatch(deletePartner(id));
      dispatch(fetchPartners());
    }
  };

  return (
    <>
      <Head>
        <title>{metaT('partners_title')}</title>
        <meta name="description" content={metaT('partners_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="all-tours">
        <PageLoader />
        <div>
          <div className="container">
            <div style={{ margin: '100px auto' }}>
              <div className="about-page-partners-cards">
                {partners.map((partner) =>
                  partner.link ? (
                    <div key={partner._id} className="partners-admin-card">
                      <div className="about-page-partners-card">
                        {partner.image || (partner.image && partner.name) ? (
                          <Image
                            width={200}
                            height={200}
                            src={apiUrl + '/' + partner.image}
                            alt={partner._id}
                          />
                        ) : (
                          partner.name
                        )}
                      </div>
                      <div className="admin-buttons">
                        <Link
                          href={`/partners/edit/${partner._id}`}
                          className="admin-button admin-button-edit"
                        >
                          <AdminIcon type="edit" />
                          {t('edit')}
                        </Link>
                        <button
                          className="admin-button admin-button-delete"
                          onClick={() => onDelete(partner._id)}
                        >
                          <AdminIcon type="delete" />
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={partner._id} className="partners-admin-card">
                      <div
                        className="about-page-partners-card"
                        key={partner._id}
                      >
                        {partner.image || (partner.image && partner.name) ? (
                          <Image
                            width={200}
                            height={200}
                            src={apiUrl + '/' + partner.image}
                            alt={partner._id}
                          />
                        ) : (
                          partner.name
                        )}
                      </div>
                      <div className="admin-buttons">
                        <Link
                          href={`/partners/edit/${partner._id}`}
                          className="admin-button admin-button-edit"
                        >
                          <AdminIcon type="edit" />
                          {t('edit')}
                        </Link>
                        <button
                          className="admin-button admin-button-delete"
                          onClick={() => onDelete(partner._id)}
                        >
                          <AdminIcon type="delete" />
                          {t('delete')}
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
