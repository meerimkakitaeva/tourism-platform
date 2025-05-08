import React, { FormEvent, useEffect, useState } from 'react';
import {
  createGuide,
  deleteGuideOrder,
  fetchOneGuideOrder,
} from '@/containers/guides/guidesThunk';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectCreateGuideLoading,
  selectOneGuideOrder,
} from '@/containers/guides/guidesSlice';
import { setIsLightMode } from '@/containers/config/configSlice';
import { ICreateGuideMutation } from '@/type';
import { useRouter } from 'next/router';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { AxiosError } from 'axios';
import { userRoles } from '@/constants';
import Custom404 from '@/pages/404';
import PageLoader from '@/components/Loaders/PageLoader';
import TextField from '@/components/UI/TextField/TextField';
import peopleIcon from '@/assets/images/people-icon.svg';
import languageIcon from '@/assets/images/languages.svg';
import globeIcon from '@/assets/images/globe.svg';
import FileInput from '@/components/UI/FileInput/FileInput';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import { changeUserRole } from '@/containers/users/usersThunk';
import '@/styles/becomeGuide.css';
import '@/styles/createGuide.css';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

const CreateGuide: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { id } = useParams() as {
    id: string;
  };
  const order = useAppSelector(selectOneGuideOrder);
  const userId = order?.user?._id || '';
  const initialState = {
    user: userId,
    description: '',
    languages: [],
    country: '',
    image: null,
  } as ICreateGuideMutation;
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCreateGuideLoading);
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const [focused, setFocused] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [state, setState] = useState<ICreateGuideMutation>(initialState);
  const t = useTranslations('guideOrders');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(setIsLightMode(true));
    const timer = setTimeout(() => {
      dispatch(fetchOneGuideOrder(id));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const onChange = async (e: IChangeEvent) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (userId) {
        await dispatch(
          createGuide({
            ...state,
            user: userId,
          }),
        ).unwrap();
        await dispatch(
          addAlert({ message: t('guideAddedAlert'), type: 'info' }),
        );
        setState(initialState);
        await dispatch(deleteGuideOrder(id));
        await dispatch(changeUserRole({ userId, newRole: userRoles.guide }));
        void router.push('/admin/guideOrders/1');
      } else {
        dispatch(addAlert({ message: t('wrongAlert'), type: 'error' }));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: t('wrongAlert'), type: 'error' }));
      }
    }
  };

  if (!user || user.role !== userRoles.admin) {
    return <Custom404 errorType="tour" />;
  }

  return (
    <>
      <Head>
        <title>
          {metaT('guide_order_title')} - {order?.name}
        </title>
        <meta name="description" content={metaT('guide_order_desc')} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <PageLoader />
        <div className="create-guide become-guide">
          <form onSubmit={onSubmit} className="become-guide-form">
            <h2>{t('createGuide')}</h2>
            <div className="user-id-input" style={{ display: 'none' }}>
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
            <div className="languages-input">
              <div className="languages-top">
                <TextField
                  name="languages"
                  type="text"
                  value={currentLanguage}
                  onChange={(e) => setCurrentLanguage(e.target.value)}
                  icon={languageIcon.src}
                  label={t('language')}
                  required
                />
                <button
                  className="form-tour-btn"
                  type="button"
                  onClick={() => {
                    if (!currentLanguage.length) return;
                    setCurrentLanguage('');
                    setState((prevState) => ({
                      ...prevState,
                      languages: [...prevState.languages, currentLanguage],
                    }));
                  }}
                >
                  {t('addBtn')}
                </button>
              </div>
              <div className="languages-bottom">
                <span>{t('languages')}:</span>
                <span>
                  {!state.languages.length
                    ? t('none')
                    : state.languages.join(', ')}
                </span>
                {state.languages.length ? (
                  <button
                    className="reset-languages"
                    type="button"
                    onClick={() =>
                      setState((prevState) => ({ ...prevState, languages: [] }))
                    }
                  >
                    {t('reset')}
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
              label={t('country')}
              required
            />
            <textarea
              className="guide-request-description"
              value={state.description}
              onChange={onChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={focused ? '' : t('description')}
              name="description"
              required
            />
            <div className="input-wrap" style={{ marginTop: '15px' }}>
              <label className="form-label-avatar avatar" htmlFor="image">
                {t('image')}
              </label>
              <FileInput
                onChange={onFileChange}
                name="image"
                image={state.image}
                className="form-control"
              />
            </div>
            <button type="submit" className="form-tour-btn">
              {createLoading ? <ButtonLoader size={18} /> : t('sendBtn')}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGuide;
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
