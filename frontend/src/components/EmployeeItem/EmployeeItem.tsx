import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAllEmployees } from '@/containers/about/aboutSlice';
import { apiUrl, userRoles } from '@/constants';
import { deleteEmployees, fetchEmployees } from '@/containers/about/aboutThunk';
import Link from 'next/link';
import { selectUser } from '@/containers/users/usersSlice';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import penIcon from '@/assets/images/pen-to-square.svg';
import trashIcon from '@/assets/images/trash.svg';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';

const EmployeeItem = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const employees = useAppSelector(selectAllEmployees);
  const t = useTranslations('about');
  const tr = useTranslations('partnerOrders');

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    if (window.confirm(tr('deleteAlert'))) {
      await dispatch(deleteEmployees(id));
      dispatch(fetchEmployees());
    }
  };

  return (
    <div className="about-page-team-cards">
      {employees.map((empl) => (
        <div className="about-page-team-card" key={empl._id}>
          <Image
            className="about-page-team-card-img"
            width={280}
            height={200}
            src={apiUrl + '/' + empl.image}
            alt={empl.name}
          />
          <div className="about-page-team-card-position">
            {t(`${empl.role}`)}
          </div>
          <h6 className="about-page-team-card-title">{empl.name}</h6>
          <div className="about-page-team-card-phone">{empl.number}</div>
          {user && user.role === userRoles.admin ? (
            <div className="about-page-team-btns">
              <Link
                href={`/employees/edit/${empl._id}`}
                className="admin-button admin-button-edit"
              >
                <AdminIcon type="edit" />
                {tr('edit')}
              </Link>
              <button
                className="admin-button admin-button-delete"
                type="button"
                onClick={() => onDelete(empl._id)}
              >
                <AdminIcon type="delete" />
                {tr('delete')}
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default EmployeeItem;
