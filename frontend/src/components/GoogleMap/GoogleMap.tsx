import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { userRoles } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';

interface IProps {
  width: string;
  height: string;
  map: string;
  mapLink: string;
}

const GoogleMap: React.FC<IProps> = ({ map, mapLink }) => {
  const user = useAppSelector(selectUser);

  const t = useTranslations('oneTour');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: 50,
      }}
    >
      <div className="google-map" dangerouslySetInnerHTML={{ __html: map }} />
      {user && user.role === userRoles.admin && (
        <Link
          className="one-tour-order-form-btn"
          href={mapLink}
          style={{
            width: 'unset',
            margin: '40px auto 0',
            textAlign: 'center',
            textDecoration: 'none',
          }}
          target="_blank"
        >
          {t('tour_edit_routes')}
        </Link>
      )}
    </div>
  );
};

export default GoogleMap;
