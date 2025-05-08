import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signInMutation } from '@/type';
import { GoogleLogin } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { googleLogin, signIn } from '@/containers/users/usersThunk';
import {
  addAlert,
  selectSignInError,
  selectSignInLoading,
  selectUser,
} from '@/containers/users/usersSlice';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import PageLoader from '@/components/Loaders/PageLoader';
import Link from 'next/link';
import TextField from '@/components/UI/TextField/TextField';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import peopleIcon from '@/assets/images/people-icon.svg';
import keyIcon from '@/assets/images/key.png';
import { useTranslations } from 'next-intl';
import '@/styles/SignInForm.css';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectSignInError);
  const router = useRouter();
  const [state, setState] = useState<signInMutation>({
    username: '',
    password: '',
  });
  const user = useAppSelector(selectUser);
  const signInLoading = useAppSelector(selectSignInLoading);
  const at = useTranslations('alert');
  const t = useTranslations('sign_in');

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
  };

  const googleLoginHandler = async (credential: string) => {
    try {
      await dispatch(googleLogin(credential)).unwrap();
      await router.push('/');
      dispatch(addAlert({ message: at('sign_in'), type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: at('error'), type: 'error' }));
      }
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(signIn(state)).unwrap();
      await router.push('/');
      dispatch(addAlert({ message: at('sign_in'), type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: at('error'), type: 'error' }));
      }
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const getTextField = (
    name: keyof signInMutation,
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
        <h2 className="form-title">{t('title')}</h2>
        <div className="form-wrap-google">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>

        {getTextField('username', t('username'), peopleIcon.src)}
        {getTextField('password', t('password'), keyIcon.src, 'password')}

        <div className="form-wrap-btn">
          <button className="form-btn" type="submit" disabled={signInLoading}>
            {signInLoading ? <ButtonLoader size={18} /> : t('login')}
          </button>
          <Link className="link-btn" href="/register">
            {t('create')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
