import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, setEditorModal } from '@/containers/users/usersSlice';
import { useRouter } from 'next/router';
import PageLoader from '@/components/Loaders/PageLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import { fetchGuideUser } from '@/containers/guides/guidesThunk';
import { User } from '@/type';
import img from '../assets/images/userImage.jpeg';
import { fetchOrdersUser } from '@/containers/orders/ordersThunk';
import UserOrders from '@/components/UserOrders/UserOrders';
import GuideProfile from '@/components/GuideProfile/GuideProfile';
import Image from 'next/image';
import bgImage from '@/assets/images/bg-image-1.jpg';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/profile.css';
import Head from 'next/head';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);
  const router = useRouter();
  const t = useTranslations('myProfile');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(false));
    if (!user) {
      router.push('/').then((r) => r);
    }
  }, [user, router, dispatch]);

  if (!user) return null;

  let image;

  if (user.avatar) {
    image = user.avatar;
  } else {
    image = img.src;
  }

  if (user.role === 'guide') {
    dispatch(fetchGuideUser(user._id));
  }

  if (user.role === 'user') {
    dispatch(fetchOrdersUser(user._id));
  }

  return (
    <>
      <Head>
        <title>{metaT('profile')}</title>
        <meta name="description" content="Your personal data here!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        <PageLoader />
        <div className="profile-page_top">
          <Image
            fill
            className="profile-page_main-img"
            src={bgImage.src}
            alt="mountains"
          />
          <div className="profile-page_top-info">
            <div className="profile-page_top-line"></div>
            <h2 className="profile-page_top-title">{t('title')}</h2>
          </div>
        </div>
        <div className="page-profile container">
          <div className="profile-page_profile">
            <div className="profile-page_img-wrap">
              <Image fill className="profile-page_img" src={image} alt="img" />
            </div>
            <div>
              <h4 className="profile-page_name">
                {t('name')} : {user.displayName}
              </h4>
              <p>
                {t('username')}: {user.username}
              </p>
              <p>
                {t('email')}: {user.email}
              </p>
              <button
                className="edit-profile page-profile_edit-btn"
                onClick={() => {
                  dispatch(setEditorModal());
                }}
              >
                {t('edit')}
              </button>
            </div>
          </div>
          <div className="profile-page_info">
            {user.role === 'user' && (
              <div>
                <h4>{t('orders')} :</h4>
                <UserOrders />
              </div>
            )}
            {user.role === 'guide' && (
              <div>
                <GuideProfile />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
