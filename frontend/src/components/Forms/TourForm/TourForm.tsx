import React, { useEffect, useState } from 'react';
import { IPlan, ITourMutation } from '@/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FileInput from '@/components/UI/FileInput/FileInput';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import {
  selectOneTour,
  selectPostTourError,
  selectPostTourLoading,
} from '@/containers/tours/toursSlice';
import { editTour, postTour } from '@/containers/tours/toursThunk';
import { useRouter } from 'next/router';
import TextFieldGuide from '@/components/UI/TextField/components/TextFieldGuide';
import FilesInput from '@/components/UI/FileInput/FilesInput';
import '@/styles/TourForm.css';
import '@/styles/admin-buttons.css';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import { useTranslations } from 'next-intl';

interface Props {
  isEdit?: boolean;
  idTour?: string;
}

const initialState: ITourMutation = {
  name: '',
  country: '',
  mainImage: null,
  duration: '',
  price: '',
  description: '',
  destination: '',
  arrival: '',
  departure: '',
  included: [],
  dressCode: '',
  category: [],
  galleryTour: null,
  plan: [],
  guides: [],
  map: '',
  mapLink: '',
};

const TourForm: React.FC<Props> = ({ isEdit, idTour }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const loading = useAppSelector(selectPostTourLoading);
  const tour = useAppSelector(selectOneTour);
  const routers = useRouter();
  const t = useTranslations('tour_form');
  const [state, setState] = useState<ITourMutation>(
    isEdit && tour
      ? {
          ...tour,
          guides: tour.guides.map(({ _id }) => _id),
          discountPrice: 0,
          mainImage: null,
          galleryTour: [],
        }
      : initialState,
  );
  const [plan, setPlan] = useState<IPlan[]>((tour && tour.plan) || []);
  const [category, setCategory] = useState<string[]>(
    (tour && tour.category) || [],
  );
  const [guide, setGuide] = useState<string[]>(
    (tour &&
      tour.guides.map((guide) => {
        return guide._id;
      })) ||
      [],
  );
  const [included, setIncluded] = useState<string[]>(
    (tour && tour.included) || [],
  );
  const [galleryTour, setGalleryTour] = useState<File[]>(
    (tour && tour.galleryTour) || [],
  );
  const a = useTranslations('alert');

  useEffect(() => {
    if (tour) {
      const guides = tour.guides.map((guide) => {
        return guide._id;
      });

      const editingTour = {
        name: tour.name,
        country: tour.country,
        mainImage: null,
        duration: tour.duration,
        price: tour.price,
        discountPrice: tour.discountPrice,
        description: tour.description,
        destination: tour.destination,
        arrival: tour.arrival,
        departure: tour.departure,
        dressCode: tour.dressCode,
        included: tour.included,
        category: tour.category,
        galleryTour: null,
        plan: tour.plan,
        guides: guides,
        map: tour.map,
        mapLink: tour.mapLink,
      };
      setState(editingTour);
      setPlan(tour.plan);
    }
    if (!isEdit) {
      setState(initialState);
    }
  }, [isEdit, tour]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && idTour) {
        await dispatch(
          editTour({
            id: idTour,
            tourMutation: {
              ...state,
              plan: plan,
              category: category,
              guides: guide,
              included: included,
              galleryTour: galleryTour,
            },
          }),
        ).unwrap();
      } else {
        await dispatch(postTour(state)).unwrap();
      }
      routers.push('/').then((r) => r);
    } catch (e) {
      alert(a('invalid_field'));
    }
  };

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
  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number,
    type: 'plan' | 'guide' | 'category' | 'included',
  ) => {
    const { name, value } = event.target;

    switch (type) {
      case 'plan':
        setPlan((prevState) => {
          const updatedPlan = [...prevState];
          updatedPlan[index] = {
            ...updatedPlan[index],
            [name]: value,
          };
          return updatedPlan;
        });
        break;

      case 'guide':
        setGuide((prevState) => {
          const updatedGuide = [...prevState];
          updatedGuide[index] = value;
          return updatedGuide;
        });
        break;

      case 'category':
        setCategory((prevState) => {
          const updatedCategory = [...prevState];
          updatedCategory[index] = value;
          return updatedCategory;
        });
        break;

      case 'included':
        setIncluded((prevState) => {
          const updatedIncluded = [...prevState];
          updatedIncluded[index] = value;
          return updatedIncluded;
        });
        break;

      default:
        break;
    }
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      if (name === 'mainImage') {
        setState((prevState) => ({
          ...prevState,
          [name]: files[0],
        }));
      } else if (name === 'galleryTour') {
        setGalleryTour(Array.from(files));
      }
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  const addOneItem = (type: 'plan' | 'guide' | 'category' | 'included') => {
    switch (type) {
      case 'plan':
        setPlan((prevState) => [
          ...prevState,
          { title: '', planDescription: '' },
        ]);
        break;

      case 'guide':
        setGuide((prevState) => [...prevState, '']);
        break;

      case 'category':
        setCategory((prevState) => [...prevState, '']);
        break;

      case 'included':
        setIncluded((prevState) => [...prevState, '']);
        break;

      default:
        break;
    }
  };

  const removeOneItem = (index: number, type: string) => {
    switch (type) {
      case 'plan':
        setPlan((prevState) => {
          const updatedPlans = [...prevState];
          updatedPlans.splice(index, 1);
          return updatedPlans;
        });
        break;

      case 'guide':
        setGuide((prevState) => {
          const updatedGuides = [...prevState];
          updatedGuides.splice(index, 1);
          return updatedGuides;
        });
        break;

      case 'category':
        setCategory((prevState) => {
          const updatedCategories = [...prevState];
          updatedCategories.splice(index, 1);
          return updatedCategories;
        });
        break;

      case 'included':
        setIncluded((prevState) => {
          const updatedIncluded = [...prevState];
          updatedIncluded.splice(index, 1);
          return updatedIncluded;
        });
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <form className="form-tour" onSubmit={submitFormHandler}>
        <h2 className="form-tour-title">
          {isEdit ? t('tour_title_edit') : t('tour_title_create')}
        </h2>
        <div className="input-tour-wrap">
          <input
            type="text"
            className={
              getFieldError('name')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="name"
            id="name"
            value={state.name}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="name" className="form-tour-label">
            {t('name')}:
          </label>
          {Boolean(getFieldError('name')) && (
            <span className="error-tour">{getFieldError('name')}</span>
          )}
        </div>
        <div className="input-tour-wrap" style={{ margin: '20px auto' }}>
          <h5 className="form-tour-title">
            {t('guides_for')} {state.name ? state.name : t('for_this')}{' '}
            {t('for_tour')}:
          </h5>
          <TextFieldGuide
            name="guide"
            selectedGuideIds={guide}
            onSelect={(selectedGuideIds) => {
              setGuide(selectedGuideIds);
            }}
          />
        </div>
        <div className="input-tour-wrap">
          <input
            type="text"
            className={
              getFieldError('country')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="country"
            id="country"
            value={state.country}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="country" className="form-tour-label">
            {t('country')}:
          </label>
          {Boolean(getFieldError('country')) && (
            <span className="error-tour">{getFieldError('country')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <input
            type="number"
            className={
              getFieldError('duration')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="duration"
            id="duration"
            value={state.duration}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="duration" className="form-tour-label">
            {t('duration')}:
          </label>
          {Boolean(getFieldError('duration')) && (
            <span className="error-tour">{getFieldError('duration')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <input
            type="number"
            className={
              getFieldError('price')
                ? 'form-tour-control-error'
                : 'form-tour-control'
            }
            name="price"
            id="price"
            value={state.price}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="price" className="form-tour-label">
            {t('price')}:
          </label>
          {Boolean(getFieldError('price')) && (
            <span className="error-tour">{getFieldError('price')}</span>
          )}
        </div>
        {isEdit && (
          <div className="input-tour-wrap">
            <input
              type="number"
              className={
                getFieldError('discountPrice')
                  ? 'form-tour-control-error'
                  : 'form-tour-control'
              }
              name="discountPrice"
              id="discountPrice"
              value={state.discountPrice}
              onChange={inputChangeHandler}
              required
            />
            <label htmlFor="discountPrice" className="form-tour-label">
              {t('discount')}:
            </label>
            {Boolean(getFieldError('discountPrice')) && (
              <span className="error-tour">
                {getFieldError('discountPrice')}
              </span>
            )}
          </div>
        )}
        <div className="input-tour-wrap">
          <FileInput
            onChange={changeFileValue}
            name="mainImage"
            image={state.mainImage}
            className="form-tour-control"
          />
          <label
            htmlFor="destination"
            className="form-tour-label form-tour-label-image"
          >
            {t('main_image')}:
          </label>
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('name') ? 'form-control-error' : 'form-tour-control'
            }
            name="description"
            id="description"
            value={state.description}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="description" className="form-tour-label-two">
            {t('description')}:
          </label>
          {Boolean(getFieldError('description')) && (
            <span className="error-tour">{getFieldError('description')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <input
            type="text"
            className={
              getFieldError('destination')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="destination"
            id="destination"
            value={state.destination}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="destination" className="form-tour-label">
            {t('destination')}:
          </label>
          {Boolean(getFieldError('destination')) && (
            <span className="error-tour">{getFieldError('destination')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('arrival')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="arrival"
            id="arrival"
            value={state.arrival}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="arrival" className="form-tour-label-two">
            {t('arrival')}:
          </label>
          {Boolean(getFieldError('arrival')) && (
            <span className="error-tour">{getFieldError('arrival')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('departure')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="departure"
            id="departure"
            value={state.departure}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="departure" className="form-tour-label-two">
            {t('departure')}:
          </label>
          {Boolean(getFieldError('departure')) && (
            <span className="error-tour">{getFieldError('departure')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('dressCode')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="dressCode"
            id="dressCode"
            value={state.dressCode}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="dressCode" className="form-tour-label-two">
            {t('dress_code')}:
          </label>
          {Boolean(getFieldError('dressCode')) && (
            <span className="error-tour">{getFieldError('dressCode')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <FilesInput
            onChange={changeFileValue}
            name="galleryTour"
            className="form-tour-control"
          />
          <label
            htmlFor="destination"
            className="form-tour-label form-tour-label-image"
          >
            {t('gallery_image')}:
          </label>
        </div>
        <div className="form-tour-included">
          <h5 className="form-tour-title">{t('what_included')}</h5>
          <button
            type="button"
            className="admin-button admin-button-add"
            style={{ width: '100%' }}
            onClick={() => addOneItem('included')}
          >
            <AdminIcon type="add" />
            {t('add_tag')}
          </button>
          {included.map((including, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <span className="form-tour-center">{index + 1}:</span>
              <input
                type="text"
                className="form-tour-control form-tour-center"
                name={`in${index}`}
                id={`in${index}`}
                value={including}
                onChange={(event) =>
                  inputChangeHandlerMassive(event, index, 'included')
                }
                required
              />

              <button
                type="button"
                onClick={() => removeOneItem(index, 'included')}
                className="tour-btn-remove"
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="form-tour-included">
          <h5 className="form-tour-title">{t('categories')}:</h5>
          <button
            type="button"
            className="admin-button admin-button-add"
            style={{ width: '100%' }}
            onClick={() => addOneItem('category')}
          >
            <AdminIcon type="add" />
            {t('add_category')}
          </button>
          {category.map((category, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
              <span className="form-tour-center">{index + 1}:</span>
              <input
                type="text"
                className="form-tour-control form-tour-center"
                name={`in${index}`}
                id={`in${index}`}
                value={category}
                onChange={(event) =>
                  inputChangeHandlerMassive(event, index, 'category')
                }
                required
              />

              <button
                type="button"
                onClick={() => removeOneItem(index, 'category')}
                className="tour-btn-remove"
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="form-tour-included">
          <h5 className="form-tour-title">{t('tour_plan')}:</h5>
          <button
            type="button"
            className="admin-button admin-button-add"
            style={{ width: '100%' }}
            onClick={() => addOneItem('plan')}
          >
            <AdminIcon type="add" />
            {t('add_day')}
          </button>
          {plan.map((_, index) => (
            <div key={index}>
              <h6>
                {1 + index} {t('day_tour')}:
              </h6>
              <div className="form-tour-plan">
                <div>
                  <div className="input-tour-wrap">
                    <input
                      type="text"
                      className="form-tour-control"
                      name={`title`}
                      id={`title`}
                      value={plan[index].title}
                      onChange={(event) =>
                        inputChangeHandlerMassive(event, index, 'plan')
                      }
                      required
                    />
                    <label htmlFor={`title`} className="form-tour-label">
                      {t('plan_name')}:
                    </label>
                  </div>
                  <div className="input-tour-wrap">
                    <textarea
                      className="form-tour-control"
                      name={`planDescription`}
                      id={`planDescription`}
                      value={plan[index].planDescription}
                      onChange={(event) =>
                        inputChangeHandlerMassive(event, index, 'plan')
                      }
                      required
                    />
                    <label
                      htmlFor={`planDescription${index}`}
                      className="form-tour-label-two"
                    >
                      {t('plan_description')}:
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeOneItem(index, 'plan')}
                  className="tour-btn-remove btn-remove-plan"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('map') ? 'form-control-error' : 'form-tour-control'
            }
            name="map"
            id="map"
            value={state.map}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="map" className="form-tour-label-two">
            {t('google_maps_link')}
          </label>
          {Boolean(getFieldError('map')) && (
            <span className="error-tour">{getFieldError('map')}</span>
          )}
        </div>
        <div className="input-tour-wrap">
          <textarea
            className={
              getFieldError('mapLink')
                ? 'form-control-error'
                : 'form-tour-control'
            }
            name="mapLink"
            id="mapLink"
            value={state.mapLink}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="mapLink" className="form-tour-label-two">
            {t('google_maps_editor')}
          </label>
          {Boolean(getFieldError('mapLink')) && (
            <span className="error-tour">{getFieldError('mapLink')}</span>
          )}
        </div>
        <button
          type="submit"
          className="admin-button admin-button-edit"
          style={{ width: '100%' }}
        >
          {loading ? (
            <ButtonLoader size={18} />
          ) : isEdit ? (
            t('save_tour')
          ) : (
            t('create_tour')
          )}
          <AdminIcon type="save" />
        </button>
      </form>
    </div>
  );
};

export default TourForm;
