import React, { useState } from 'react';
import { IPartnerMutation } from '@/type';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import { selectPostTourError } from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editPartner } from '@/containers/partners/partnersThunk';
import FileInput from '@/components/UI/FileInput/FileInput';
import { useTranslations } from 'next-intl';

interface Props {
  idPartner: string;
  editingPartner: IPartnerMutation;
}

const PartnerForm: React.FC<Props> = ({ idPartner, editingPartner }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const routers = useRouter();
  const [state, setState] = useState<IPartnerMutation>(editingPartner);
  const t = useTranslations('partners');
  const at = useTranslations('alert');
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (idPartner) {
        const obj = {
          id: idPartner,
          partnerMutation: state,
        };
        await dispatch(editPartner(obj)).unwrap();
        routers.push('/admin/partners/all').then((r) => r);
      }
    } catch (e) {
      alert(at('invalid_field'));
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form className="form-news" onSubmit={submitFormHandler}>
      <h2 className="form-slider-title">{t('edit_title')}</h2>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('name') ? 'form-control-error' : 'form-control'
          }
          name="name"
          id="name"
          value={state.name}
          onChange={inputChangeHandler}
        />
        <label htmlFor="name" className="form-label">
          {t('edit_name')}
        </label>
        {Boolean(getFieldError('name')) && (
          <span className="error">{getFieldError('name')}</span>
        )}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('link') ? 'form-control-error' : 'form-control'
          }
          name="link"
          id="link"
          value={state.link}
          onChange={inputChangeHandler}
        />
        <label htmlFor="link" className="form-label">
          {t('edit_link')}
        </label>
        {Boolean(getFieldError('link')) && (
          <span className="error">{getFieldError('link')}</span>
        )}
      </div>
      <div className="input-wrap">
        <label className="form-label-avatar avatar" htmlFor="image">
          {t('edit_image')}
        </label>
        <FileInput
          onChange={changeFileValue}
          name="image"
          image={state.image}
          className="form-control"
        />
      </div>
      <div className="form-wrap-btn">
        <button type="submit" className="form-btn">
          {t('edit_save')}
        </button>
      </div>
    </form>
  );
};

export default PartnerForm;
