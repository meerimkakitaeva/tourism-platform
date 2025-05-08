import React, { useState } from 'react';
import { IMainSliderMutation } from '@/type';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import { selectPostTourError } from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editSliders, postSliders } from '@/containers/slider/sliderThunk';
import FileInput from '@/components/UI/FileInput/FileInput';
import { useTranslations } from 'next-intl';

interface Props {
  existingSlider?: IMainSliderMutation;
  isEdit?: boolean;
  idSlider?: string;
}

const initialState = {
  country: '',
  toursAmount: '',
  image: null,
};
const MainSliderForm: React.FC<Props> = ({
  isEdit,
  existingSlider = initialState,
  idSlider,
}) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const routers = useRouter();
  const [state, setState] = useState<IMainSliderMutation>(existingSlider);
  const a = useTranslations('alert');
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && idSlider) {
        const obj = {
          id: idSlider,
          mainSliderMutation: state,
        };
        await dispatch(editSliders(obj)).unwrap();
        routers.push('/').then((r) => r);
      } else {
        await dispatch(postSliders(state)).unwrap();
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
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };
  return (
    <form className="form-slider" onSubmit={submitFormHandler}>
      <h2 className="form-slider-title">
        {isEdit ? 'Save SLider' : 'Create Slider'}
      </h2>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('country') ? 'form-control-error' : 'form-control'
          }
          name="country"
          id="country"
          value={state.country}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="country" className="form-label">
          Slider country:
        </label>
        {Boolean(getFieldError('country')) && (
          <span className="error">{getFieldError('country')}</span>
        )}
      </div>
      <div className="input-wrap">
        <label className="form-label-avatar avatar" htmlFor="image">
          Image
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
          {isEdit ? 'Save slider' : 'Create slider'}
        </button>
      </div>
    </form>
  );
};

export default MainSliderForm;
