import React, { useEffect, useState } from 'react';
import { RegisterMutation } from '@/type';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addAlert,
  clearError,
  selectSignUpError,
  selectSignUpLoading,
  selectUser,
} from '@/containers/users/usersSlice';
import { signUp } from '@/containers/users/usersThunk';
import { useRouter } from 'next/router';
import FileInput from '@/components/UI/FileInput/FileInput';
import Link from 'next/link';
import PageLoader from '@/components/Loaders/PageLoader';
import TextField from '@/components/UI/TextField/TextField';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import peopleIcon from '@/assets/images/people-icon.svg';
import keyIcon from '@/assets/images/key.png';
import emailIcon from '@/assets/images/email-icon.svg';
import penIcon from '@/assets/images/pen-icon.svg';
import { useTranslations } from 'next-intl';
import '@/styles/SignInForm.css';

const initialState: RegisterMutation = {
  username: '',
  password: '',
  displayName: '',
  email: '',
  avatar: null,
};

const SignUpForm = () => {
  const error = useSelector(selectSignUpError);
  const router = useRouter();
  const [state, setState] = useState<RegisterMutation>(initialState);
  const dispatch = useAppDispatch();
  const signUpLoading = useAppSelector(selectSignUpLoading);
  const user = useAppSelector(selectUser);

  const at = useTranslations('alert');
  const t = useTranslations('sign_up');

  useEffect(() => {
    if (user) {
      void router.push('/');
    }
  }, [user, router]);

  const inputChangeHandler = (event: IChangeEvent) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });

    dispatch(clearError());
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

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signUp(state)).unwrap();
      await router.push('/');
      dispatch(
        addAlert({
          message:
            'An email with a confirmation link has been sent. Please check your email.',
          type: 'info',
        }),
      );
    } catch {
      dispatch(addAlert({ message: at('error'), type: 'error' }));
    }
  };

  const getTextField = (
    name: keyof Omit<RegisterMutation, 'avatar'>,
    label: string,
    icon: string,
    type?: React.HTMLInputTypeAttribute,
  ) => (
    <TextField
      name={name}
      label={label}
      type={type || 'text'}
      value={state[name]}
      onChange={inputChangeHandler}
      icon={icon}
      errorMessage={getFieldError(name)}
      errorMessageSize={12}
      style={{ marginBottom: 10 }}
      required
    />
  );

  return (
    <div className="form-block">
      <PageLoader />
      <form className="form" onSubmit={submitFormHandler}>
        <h2 className="form-title"> {t('title')}</h2>
        {getTextField('username', t('username'), peopleIcon.src)}
        {getTextField('password', t('password'), keyIcon.src, 'password')}
        {getTextField('displayName', t('name'), penIcon.src)}
        {getTextField('email', t('email'), emailIcon.src, 'email')}
        <div className="input-wrap input-wrap-avatar">
          <label className="form-label-avatar avatar">{t('avatar')}</label>
          <FileInput
            onChange={changeFileValue}
            name="avatar"
            image={state.avatar}
            className="form-control"
          />
        </div>
        <div className="form-wrap-btn">
          <button type="submit" className="form-btn">
            {signUpLoading ? t('loading') : t('sign_up')}
          </button>
          <Link className="link-btn" href="/login">
            {t('sign_in')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
