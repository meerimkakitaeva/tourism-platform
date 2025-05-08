import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { wrapper } from '@/store/store';
import { GOOGLE_CLIENT_ID } from '@/constants';
import { addInterceptors } from '@/axiosApi';
import AppToolBar from '@/components/UI/AppToolBar/AppToolBar';
import Alerts from '@/components/Alert/Alerts';
import Footer from '@/components/Footer/Footer';
import { useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import '@/styles/fonts.css';
import '@/styles/Filter.css';
import '@/styles/TourForm.css';
import '@/styles/ToursPage.css';
import '@/styles/SignInForm.css';
import '@/styles/langSelect.css';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  addInterceptors(store);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <NextIntlClientProvider
        locale={router.locale}
        timeZone="Europe/Vienna"
        messages={...props.pageProps.messages}
      >
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Provider store={store}>
            <header>
              <AppToolBar />
            </header>
            <main>
              <Alerts />
              <Component {...props.pageProps} />
            </main>
            <footer>
              <Footer />
            </footer>
          </Provider>
        </GoogleOAuthProvider>
      </NextIntlClientProvider>
    </>
  );
}

export default App;
