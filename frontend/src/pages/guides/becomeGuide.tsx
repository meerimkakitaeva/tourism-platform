import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextField from '@/components/UI/TextField/TextField';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { becomeGuide } from '@/containers/guides/guidesThunk';
import PageLoader from '@/components/Loaders/PageLoader';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { ISendGuideRequestMutation } from '@/type';
import peopleIcon from '@/assets/images/people-icon.svg';
import phoneIcon from '@/assets/images/phone-icon.svg';
import { selectGuideRequestLoading } from '@/containers/guides/guidesSlice';
import Custom404 from '@/pages/404';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/becomeGuide.css';
import Head from 'next/head';

const BecomeGuide = () => {
  const user = useAppSelector(selectUser);
  const userId = (user && user._id) || '';
  const initialState: ISendGuideRequestMutation = {
    user: userId,
    name: '',
    surname: '',
    number: '',
    message: '',
  };
  const dispatch = useAppDispatch();
  const guideRequestLoading = useAppSelector(selectGuideRequestLoading);
  const thisUser = useAppSelector(selectUser);
  const router = useRouter();
  const [state, setSate] = useState<ISendGuideRequestMutation>(initialState);
  const [focused, setFocused] = useState(false);
  const at = useTranslations('alert');
  const t = useTranslations('guide');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
  }, [dispatch]);

  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setSate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!state.name || !state.surname || !state.number || !state.message) {
      dispatch(addAlert({ message: at('empty'), type: 'error' }));
      return;
    }

    try {
      await dispatch(becomeGuide(state));
      dispatch(addAlert({ message: at('success'), type: 'info' }));
      setSate(initialState);
      void router.push('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: at('error'), type: 'error' }));
        return;
      }
    }
  };

  if (!thisUser) {
    return <Custom404 errorType="tour" />;
  }

  console.log(user);

  return (
    <>
      <Head>
        <title>{metaT('become_guide_title')}</title>
        <meta name="description" content={metaT('become_guide_desc')} />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="become-guide">
          <form onSubmit={onSubmit} className="become-guide-form">
            <h2>{t('become_form_title')}</h2>
            <div style={{ display: 'none' }}>
              <TextField
                name="user"
                type="text"
                value={userId}
                onChange={onChange}
                icon={peopleIcon.src}
                label="user*"
                required
              />
            </div>
            <TextField
              name="name"
              type="text"
              value={state.name}
              onChange={onChange}
              icon={peopleIcon.src}
              label={t('become_form_name')}
              required
            />
            <TextField
              name="surname"
              type="text"
              value={state.surname}
              onChange={onChange}
              icon={peopleIcon.src}
              label={t('become_form_surname')}
              required
            />
            <TextField
              name="number"
              type="text"
              value={state.number}
              onChange={onChange}
              icon={phoneIcon.src}
              label={t('become_form_phone')}
              required
            />
            <textarea
              className="guide-request-description"
              value={state.message}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? '' : t('become_form_message')}
              name="message"
              required
            />
            <button type="submit" className="form-tour-btn">
              {guideRequestLoading ? (
                <ButtonLoader size={18} />
              ) : (
                t('become_form_send')
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BecomeGuide;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
