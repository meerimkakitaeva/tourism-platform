import React, { useEffect, useRef, useState } from 'react';
import NavLink from 'next/link';
import UserMenu from './components/UserMenu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectLanguage,
  selectUser,
  setLang,
} from '@/containers/users/usersSlice';
import ToolBarMenu from '@/components/UI/AppToolBar/components/ToolBarMenu';
import { usePathname } from 'next/navigation';
import { fetchTours } from '@/containers/tours/toursThunk';
import { apiUrl, languages } from '@/constants';
import Image from 'next/image';
import chevronRight from '@/assets/images/chevron-right.svg';
import chevronRightLight from '@/assets/images/chevron-right-light.svg';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import '@/styles/AppToolBar.css';
import logoLight from '../../../assets/images/main-logo-light.png';
import logoDark from '../../../assets/images/main-logo.png';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const [navShow, setNavShow] = useState(false);
  const [menuShow, setMenuShow] = useState(false);
  const [langOptions, setLangOptions] = useState(false);
  const [scrollSide, setScrollSide] = useState<'scroll-right' | 'scroll-left'>(
    'scroll-right',
  );
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navbar');

  const { isLightMode } = useAppSelector((state) => state.config);

  const toolBarRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const showMenu = async () => {
    setMenuShow(false);
    await dispatch(fetchTours({}));
  };

  const closeNavMenu = () => setNavShow(false);

  const setClassList = () => {
    if (!toolBarRef.current || isLightMode === null) return;

    const classList: string[] = [
      `tool-bar-body-${isLightMode ? '' : 'dark-'}scrolled`,
    ];

    if (window.scrollY > 0) {
      toolBarRef.current?.classList.add(...classList);
    } else {
      toolBarRef.current?.classList.remove(...classList);
    }
  };

  const setEventListener = () => {
    if (window.screen.width >= 992) {
      document.addEventListener('scroll', setClassList);
    }
  };

  useEffect(() => {
    setEventListener();
    const { locale } = router;
    dispatch(setLang(locale || 'en'));
    window.addEventListener('resize', setEventListener);

    document.addEventListener('click', () => {
      setNavShow(false);
      setMenuShow(false);
      setLangOptions(false);
    });

    return () => {
      window.removeEventListener('resize', setEventListener);
      document.removeEventListener('scroll', setClassList);
    };
  }, [dispatch, isLightMode, router, setEventListener]);

  const onLangSwitch = (language: string) => {
    const href = {
      pathname: router.pathname,
      query: router.query,
    };
    void router.push(href, undefined, { locale: language });
    dispatch(setLang(language));
    setTimeout(() => {
      location.reload();
    }, 200);
  };

  const scrollNavSide = () => {
    if (!navRef.current) return;

    if (scrollSide === 'scroll-right') {
      navRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
      setScrollSide('scroll-left');
    } else {
      navRef.current?.firstElementChild?.scrollIntoView({ behavior: 'smooth' });
      setScrollSide('scroll-right');
    }
  };

  const scrollSideRef = useRef<HTMLButtonElement | null>(null);

  const setResizeEventListenerForScrollSide = () => {
    if (!scrollSideRef.current || !navRef.current) return;

    if (window.screen.width <= 992 && navRef.current.scrollWidth <= 700) {
      scrollSideRef.current.style.display = 'none';
    }

    if (window.screen.width > 992 && navRef.current.scrollWidth > 700) {
      scrollSideRef.current.style.display = 'block';
    }
  };

  useEffect(() => {
    if (!scrollSideRef.current) return;

    window.addEventListener('resize', setResizeEventListenerForScrollSide);

    if (navRef.current) {
      scrollSideRef.current.style.display =
        navRef.current.scrollWidth <= 700 ? 'none' : 'block';
    }

    return () => {
      window.removeEventListener('resize', setResizeEventListenerForScrollSide);
    };
  }, [navRef.current, scrollSideRef.current, user]);

  return (
    <>
      <div
        className={`tool-bar-body ${
          isLightMode ? 'tool-bar-body-light' : 'tool-bar-body-dark'
        }`}
        ref={toolBarRef}
      >
        <div
          className={`form-lang ${langOptions ? 'form-lang-open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setLangOptions(!langOptions);
          }}
        >
          <span className="form-lang-value">
            <Image
              width={40}
              height={40}
              src={apiUrl + `/fixtures/${lang}.jpg`}
              alt={lang}
            />
          </span>
          <div
            className={`form-lang-options form-lang-options-${
              langOptions ? 'open' : 'closed'
            }`}
          >
            {Object.keys(languages).map(
              (language) =>
                language !== lang && (
                  <span
                    className="form-lang-option"
                    onClick={() => onLangSwitch(language)}
                    key={language}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={apiUrl + `/fixtures/${language}.jpg`}
                      alt={language}
                    />
                  </span>
                ),
            )}
          </div>
        </div>
        <div className="container">
          <div className="tool-bar">
            <div className="logo-wrap">
              <button
                className={`nav-btn ${!isLightMode ? 'nav-btn-dark' : ''} ${
                  navShow ? 'open' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setNavShow(!navShow);
                  setMenuShow(false);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <NavLink href="/" className="logo" onClick={showMenu}>
                <Image
                  width={60}
                  height={50}
                  src={logoDark.src}
                  alt="chevron"
                />
              </NavLink>
            </div>
            <div className="nav-wrapper">
              <nav
                className={`nav ${navShow ? 'nav-active' : ''}`}
                onClick={(e) => e.stopPropagation()}
                ref={navRef}
              >
                <NavLink
                  id="nav-first-link"
                  href="/"
                  className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                  onClick={() => {
                    void showMenu();
                    closeNavMenu();
                  }}
                >
                  {t('home')}
                </NavLink>
                <NavLink
                  href="/tours/all/1"
                  className={`nav-link ${
                    pathname && pathname.includes('/tours/all') ? 'active' : ''
                  }`}
                  onClick={() => {
                    void showMenu();
                    closeNavMenu();
                  }}
                >
                  {t('tours')}
                </NavLink>
                <NavLink
                  href="/about"
                  className={`nav-link ${
                    pathname === '/about' ? 'active' : ''
                  }`}
                  onClick={() => {
                    showMenu();
                    closeNavMenu();
                  }}
                >
                  {t('about_us')}
                </NavLink>
                {user ? (
                  <UserMenu
                    user={user}
                    onClick={() => {
                      showMenu();
                      closeNavMenu();
                    }}
                    pathname={pathname}
                  />
                ) : (
                  <div></div>
                )}
                <NavLink
                  href="/news/all/1"
                  className={`nav-link ${
                    pathname && pathname.includes('/news/all') ? 'active' : ''
                  }`}
                  onClick={() => {
                    showMenu();
                    closeNavMenu();
                  }}
                >
                  {t('news')}
                </NavLink>
                <NavLink
                  id="nav-last-link"
                  href="/contactUs"
                  className={`nav-link ${
                    pathname === '/contactUs' ? 'active' : ''
                  }`}
                  onClick={async () => {
                    await showMenu();
                    closeNavMenu();
                  }}
                >
                  {t('contact_us')}
                </NavLink>
              </nav>
              <button
                ref={scrollSideRef}
                className={scrollSide}
                onClick={scrollNavSide}
              >
                <Image
                  fill
                  src={isLightMode ? chevronRight.src : chevronRightLight.src}
                  alt="chevron"
                />
              </button>
            </div>
            <div className="user-menu">
              <button
                className={`menu-btn ${!isLightMode ? 'menu-btn-dark' : ''} ${
                  menuShow ? 'open' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuShow(!menuShow);
                  dispatch(fetchTours({}));
                }}
              >
                <span></span>
                <span></span>
                <span></span>
                <span>{t('menu')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToolBarMenu show={menuShow} onClick={showMenu} />
    </>
  );
};

export default AppToolBar;
