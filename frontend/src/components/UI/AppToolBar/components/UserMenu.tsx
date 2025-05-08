import React from 'react';
import { User } from '@/type';
import NavLink from 'next/link';
import { userRoles } from '@/constants';
import { useTranslations } from 'next-intl';

interface IProps {
  user: User;
  onClick: () => void;
  pathname: string;
}

const UserMenu: React.FC<IProps> = ({ user, onClick, pathname }) => {
  const t = useTranslations('navbar');
  return (
    <>
      <NavLink
        href="/profile"
        className={`nav-link profile-link ${
          pathname === '/profile' ? 'active' : ''
        }`}
        onClick={onClick}
      >
        {t('my_profile')}
      </NavLink>
      {user && user.role === userRoles.admin && (
        <NavLink
          href="/admin"
          as="/admin"
          className={`nav-link profile-link ${
            pathname === '/admin' ? 'active' : ''
          }`}
          onClick={onClick}
        >
          {t('admin_page')}
        </NavLink>
      )}
      {user && user.role === userRoles.moderator && (
        <NavLink
          href="/orders/allOrders"
          as="/orders/allOrders"
          className={`nav-link profile-link ${
            pathname === '/orders/allOrders' ? 'active' : ''
          }`}
          onClick={onClick}
        >
          {t('orders')}
        </NavLink>
      )}
    </>
  );
};

export default UserMenu;
