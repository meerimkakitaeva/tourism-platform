import React from 'react';
import NavLink from 'next/link';
import { useTranslations } from 'next-intl';

interface IProps {
  onClick: () => void;
  pathname: string;
}

const AnonymousMenu: React.FC<IProps> = ({ onClick, pathname }) => {
  const t = useTranslations('navbar');
  return (
    <>
      <NavLink
        href="/login"
        className={`form-link ${pathname === '/login' ? 'active' : ''}`}
        onClick={onClick}
      >
        {t('sign_in')}
      </NavLink>
      <NavLink
        href="/register"
        className={`form-link ${pathname === '/register' ? 'active' : ''}`}
        onClick={onClick}
      >
        {t('sign_up')}
      </NavLink>
    </>
  );
};

export default AnonymousMenu;
