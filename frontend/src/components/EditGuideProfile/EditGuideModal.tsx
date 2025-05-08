import React, { FormEvent, useEffect, useState } from 'react';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import TextField from '@/components/UI/TextField/TextField';
import penIcon from '@/assets/images/pen-icon.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { AxiosError } from 'axios';
import { IEditGuide } from '@/type';
import {
  selectEditGuideLoading,
  selectEditorGuideModal,
  selectGuideUser,
  setGuideEditorModal,
} from '@/containers/guides/guidesSlice';
import { editGuide, fetchGuideUser } from '@/containers/guides/guidesThunk';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { useTranslations } from 'next-intl';

const EditGuideModal = () => {
  const dispatch = useAppDispatch();
  const guide = useAppSelector(selectGuideUser);
  const user = useAppSelector(selectUser);
  const editLoading = useAppSelector(selectEditGuideLoading);
  const [state, setSate] = useState<IEditGuide>({
    id: '',
    description: '',
    languages: [],
    country: '',
  });
  const modal = useAppSelector(selectEditorGuideModal);
  const t = useTranslations('guide');
  const a = useTranslations('alert');

  useEffect(() => {
    if (!guide) return;
    setSate((prevState) => ({
      ...prevState,
      id: guide._id,
      description: guide.description,
      country: guide.country,
      languages: guide.languages,
    }));
  }, [guide]);

  const onChangeHandler = (e: IChangeEvent) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'languages') {
      const lang = value.split(',');
      return setSate((prevState) => ({
        ...prevState,
        languages: lang,
      }));
    }
    setSate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(editGuide(state)).unwrap();
      await dispatch(fetchGuideUser(user._id));
      dispatch(addAlert({ message: a('changes_saved'), type: 'info' }));
      dispatch(setGuideEditorModal());
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: a('error'), type: 'error' }));
      }
    }
  };

  return (
    <div
      className={`editor-modal ${modal ? 'editor-modal-open' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setGuideEditorModal());
      }}
    >
      <div className="editor-modal-inner" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <h2>{t('editBtn')}</h2>
          <textarea
            className="guide-input-description"
            name={t('description')}
            value={state.description}
            onChange={onChangeHandler}
            required
          />
          <TextField
            name="country"
            type="text"
            value={state.country}
            onChange={onChangeHandler}
            icon={penIcon.src}
            label={t('country')}
            required
          />
          <TextField
            name="languages"
            type="text"
            value={state.languages.toString()}
            onChange={onChangeHandler}
            icon={penIcon.src}
            label={t('languages')}
            required
          />
          <div>
            <button
              type="submit"
              className="form-tour-btn"
              style={{ margin: 0 }}
            >
              {editLoading ? <ButtonLoader size={18} /> : t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGuideModal;
