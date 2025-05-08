import React from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { userRoles } from '@/constants';
import { deleteGuide, fetchAdminGuides } from '@/containers/guides/guidesThunk';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import '@/styles/GuideItem.css';
import '@/styles/OneGuidePage.css';
import '@/styles/admin-buttons.css';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';

interface Props {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const GuideItem: React.FC<Props> = ({
  id,
  name,
  role,
  description,
  imageUrl,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const t = useTranslations('about');
  const a = useTranslations('alert');

  const onDelete = async (id: string) => {
    if (window.confirm(a('delete_guide'))) {
      await dispatch(deleteGuide(id));
      dispatch(fetchAdminGuides());
    }
  };

  return (
    <div className="guide-card">
      <div className="guide-card__image">
        <Image fill src={imageUrl} alt={`${name} - ${role}`} />
      </div>
      <div className="guide-card__content">
        <h2 className="guide-card__name">{name}</h2>
        <p className="guide-card__description">{description}</p>
        <div
          className="admin-buttons"
          style={{ flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link
            href={`/guides/${id}`}
            className="admin-button admin-button-edit"
            style={{ width: '100%' }}
          >
            {t(`guideViewMore`)}
          </Link>
          {user && user.role === userRoles.admin ? (
            <button
              className="admin-button admin-button-delete"
              onClick={() => onDelete(id)}
            >
              <AdminIcon type="delete" />
              {t(`guideDelete`)}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GuideItem;
