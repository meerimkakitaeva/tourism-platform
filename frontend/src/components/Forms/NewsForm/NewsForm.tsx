import React, { useEffect, useState } from 'react';
import { INews, INewsMutation } from '@/type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSelector } from 'react-redux';
import {
  selectPostTourError,
  selectPostTourLoading,
} from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editNews, fetchOneNews, postNews } from '@/containers/news/newsThunk';
import FilesInput from '@/components/UI/FileInput/FilesInput';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { setIsLightMode } from '@/containers/config/configSlice';
import { useTranslations } from 'next-intl';
import '@/styles/newReviewForm.css';
import '@/styles/admin-buttons.css';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';

interface Props {
  isEdit?: boolean;
  idNews?: string;
}

const initialState = {
  title: '',
  description: '',
  category: [],
  images: null,
};

const NewsForm: React.FC<Props> = ({ isEdit, idNews }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const loading = useAppSelector(selectPostTourLoading);
  const routers = useRouter();
  const [state, setState] = useState<INewsMutation>(initialState);
  const [images, setImages] = useState<File[]>(state.images || []);
  const [category, setCategory] = useState<string[]>(state.category || []);
  const t = useTranslations('news');
  const a = useTranslations('alert');

  useEffect(() => {
    if (idNews) {
      dispatch(fetchOneNews(idNews)).then((res: { payload: INews }) =>
        setState({ ...res.payload, images: null }),
      );
    }
    dispatch(setIsLightMode(true));
  }, [dispatch, idNews]);

  const inputChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      state.category = category;
      state.images = images;
      if (isEdit && idNews) {
        const obj = {
          id: idNews,
          newsMutation: state,
        };
        await dispatch(editNews(obj)).unwrap();
      } else {
        await dispatch(postNews(state)).unwrap();
      }
      routers.push('/').then((r) => r);
    } catch (e) {
      alert(a('invalid_field'));
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
    const { files } = e.target;

    if (files) {
      setImages(Array.from(files));
    }
  };

  const addOneItem = () => {
    setCategory((prevState) => [...prevState, '']);
  };

  const removeOneItem = (index: number) => {
    setCategory((prevState) => {
      const updatedCategories = [...prevState];
      updatedCategories.splice(index, 1);
      return updatedCategories;
    });
  };

  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
  ) => {
    const { value } = event.target;

    setCategory((prevState) => {
      const updatedCategory = [...prevState];
      updatedCategory[index] = value;
      return updatedCategory;
    });
  };

  return (
    <form className="form-news" onSubmit={submitFormHandler}>
      <h2 className="form-news-title">
        {isEdit
          ? t(`news_create_form_edit_news`)
          : t(`news_create_form_create_news`)}
      </h2>
      <div className="input-news-wrap">
        <input
          type="text"
          className={
            getFieldError('title')
              ? 'form-news-control-error'
              : 'form-news-control'
          }
          name="title"
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="title" className="form-news-label">
          {t(`news_create_form_title_placeholder`)}
        </label>
        {Boolean(getFieldError('title')) && (
          <span className="error-news">{getFieldError('title')}</span>
        )}
      </div>
      <div className="input-news-wrap">
        <textarea
          className={
            getFieldError('description')
              ? 'form-news-error'
              : 'form-news-control'
          }
          name="description"
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="description" className="form-news-label-two">
          {t(`news_create_form_description_placeholder`)}
        </label>
        {Boolean(getFieldError('description')) && (
          <span className="error-tour">{getFieldError('description')}</span>
        )}
      </div>
      <div className="input-news-wrap">
        <FilesInput
          onChange={changeFileValue}
          name="images"
          className="form-news-control"
        />
        <label
          htmlFor="images"
          className="form-images-label form-news-label-image"
        >
          {t('news_create_form_image_placeholder')}
        </label>
      </div>
      <div className="form-news-included">
        <h5 className="form-news-title">{t('news_categories')}:</h5>
        <button
          type="button"
          className="admin-button admin-button-add"
          style={{ width: '100%' }}
          onClick={() => addOneItem()}
        >
          <AdminIcon type="add" />
          {t(`news_create_add_category`)}
        </button>
        {category.map((category, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <span className="form-news-center">{index + 1}:</span>
            <input
              type="text"
              className="form-news-control form-news-center"
              name={`in${index}`}
              id={`in${index}`}
              value={category}
              onChange={(event) => inputChangeHandlerMassive(event, index)}
              required
            />
            <button
              type="button"
              onClick={() => removeOneItem(index)}
              className="news-btn-remove"
            >
              -
            </button>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="admin-button admin-button-edit"
        style={{ width: '100%', marginTop: 30 }}
      >
        {loading ? (
          <ButtonLoader size={18} />
        ) : isEdit ? (
          t(`news_create_form_edit_news`)
        ) : (
          t(`news_create_form_create_news`)
        )}
        <AdminIcon type="save" />
      </button>
    </form>
  );
};

export default NewsForm;
