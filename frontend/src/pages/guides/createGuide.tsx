import React, { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextField from '@/components/UI/TextField/TextField';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import PageLoader from '@/components/Loaders/PageLoader';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import {
  addAlert,
  selectUser,
  selectUsers,
} from '@/containers/users/usersSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { ICreateGuideMutation, User } from '@/type';
import peopleIcon from '@/assets/images/people-icon.svg';
import languageIcon from '@/assets/images/languages.svg';
import globeIcon from '@/assets/images/globe.svg';
import { getUsers } from '@/containers/users/usersThunk';
import { createGuide } from '@/containers/guides/guidesThunk';
import FileInput from '@/components/UI/FileInput/FileInput';
import { selectCreateGuideLoading } from '@/containers/guides/guidesSlice';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import '@/styles/createGuide.css';
import Head from 'next/head';

const CreateGuide = () => {
  const initialState = {
    user: '',
    description: '',
    languages: [],
    country: '',
    image: null,
  } as ICreateGuideMutation;
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateGuideLoading);
  const router = useRouter();
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const [state, setSate] = useState<ICreateGuideMutation>(initialState);
  const [focused, setFocused] = useState(false);
  const [userInputFocused, setUserInputFocused] = useState(false);
  const [userId, setUserId] = useState('');
  const [userFieldClassName, setUserFieldClassName] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');
  const t = useTranslations('guide');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
    document.addEventListener('click', () => setUserInputFocused(false));
    if (userId.length) {
      setUserFieldClassName('text-field-input-success');
    } else if (!userId.length && userInputFocused) {
      setUserFieldClassName('text-field-input-error');
    }
  }, [dispatch, router, userId, userInputFocused]);

  const onChange = async (e: IChangeEvent) => {
    const { name, value } = e.target;
    if (name === 'user') {
      setUserId('');
      setUserFieldClassName('text-field-input-error');
      if (value.length) {
        await dispatch(getUsers(value)).unwrap();
        setUserInputFocused(true);
      } else {
        setUserInputFocused(false);
      }
    }
    setSate((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setSate((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        createGuide({
          ...state,
          user: userId,
        }),
      ).unwrap();
      dispatch(addAlert({ message: 'Request is sent', type: 'info' }));
      setSate(initialState);
      void router.push('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: 'Something is wrong!', type: 'error' }));
      }
    }
  };

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <>
      <Head>
        <title>{metaT('create_guide_title')}</title>
        <meta name="description" content={metaT('create_guide_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="create-guide become-guide">
          <form onSubmit={onSubmit} className="become-guide-form">
            <h2>{t('create_form_title')}</h2>
            <div
              className="user-id-input"
              onClick={(e) => {
                e.stopPropagation();
                setUserInputFocused(true);
              }}
            >
              <TextField
                className={userFieldClassName}
                name="user"
                type="text"
                value={state.user!}
                onChange={onChange}
                icon={peopleIcon.src}
                label="user*"
                required
              />
              {userInputFocused && (
                <div className="matched-users">
                  <div className="matched-users-inner">
                    {users.map((user: User) => (
                      <div
                        className="matched-user"
                        key={user._id}
                        onClick={() => {
                          setUserId(user._id);
                          setSate((prevState) => ({
                            ...prevState,
                            user: user.username,
                          }));
                          setCurrentLanguage('');
                        }}
                      >
                        <h4>{user.username}</h4>
                        <span>{user.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="languages-input">
              <div className="languages-top">
                <TextField
                  name="languages"
                  type="text"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  icon={languageIcon.src}
                  label={t('create_form_language')}
                  required
                />
                <button
                  className="form-tour-btn"
                  type="button"
                  onClick={() => {
                    if (!currentLanguage.length) return;
                    setCurrentLanguage('');
                    setSate((prevState) => ({
                      ...prevState,
                      languages: [...prevState.languages, currentLanguage],
                    }));
                  }}
                >
                  {t('create_form_add_language')}
                </button>
              </div>
              <div className="languages-bottom">
                <span>{t('create_form_languages')}:</span>
                <span>
                  {!state.languages.length
                    ? t('create_form_none')
                    : state.languages.join(', ')}
                </span>
                {state.languages.length ? (
                  <button
                    className="reset-languages"
                    type="button"
                    onClick={() =>
                      setSate((prevState) => ({ ...prevState, languages: [] }))
                    }
                  >
                    {t('create_form_reset')}
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
            <TextField
              name="country"
              type="text"
              value={state.country}
              onChange={onChange}
              icon={globeIcon.src}
              label={t('create_form_country')}
              required
            />
            <textarea
              className="guide-request-description"
              value={state.description}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? '' : t('create_form_about')}
              name="description"
              required
            />
            <div className="input-wrap" style={{ marginTop: '15px' }}>
              <label className="form-label-avatar avatar" htmlFor="image">
                {t('create_form_image')}
              </label>
              <FileInput
                onChange={onFileChange}
                name="image"
                image={state.image}
                className="form-control"
              />
            </div>
            <button type="submit" className="form-tour-btn">
              {createLoading ? (
                <ButtonLoader size={18} />
              ) : (
                t('create_form_send')
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGuide;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
