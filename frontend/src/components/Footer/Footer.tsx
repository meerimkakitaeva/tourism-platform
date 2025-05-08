import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/containers/users/usersSlice';
import { useTranslations } from 'next-intl';
import '@/styles/Footer.css';

const Footer = () => {
  const user = useAppSelector(selectUser);
  const t = useTranslations('footer');
  return (
    <div>
      <div className="footer-inner">
        <div className="footer-inner-top container">
          <div className="footer-inner-top-1">
            <h6 className="footer-title">{t('links')}</h6>
            <div className="footer-inner-top-links">
              <div>
                <Link href="/about" className="footer-inner-top-link">
                  {t('about_us')}
                </Link>
                <Link
                  href={user ? '/guides/becomeGuide' : '/login'}
                  className="footer-inner-top-link"
                >
                  {t('guide')}!
                </Link>
              </div>
              <div>
                <Link href="/contactUs" className="footer-inner-top-link">
                  {t('contact_us')}
                </Link>
                <Link href="/news/all/1" className="footer-inner-top-link">
                  {t('news')}
                </Link>
              </div>
            </div>
            <div className="footer-inner-top-social">
              <a className="footer-links facebook" href="#" />
              <a className="footer-links instagram" href="#" />
              <a className="footer-links twitter" href="#" />
              <a className="footer-links whatsapp" href="#" />
            </div>
          </div>
          <div className="footer-inner-top-2">
            <h6 className="footer-title">{t('touch')}</h6>
            <div className="footer-address">{t('address')}</div>
            <div className="footer-phone">+996 553 355 777</div>
            <div className="footer-email">info@demolink.org</div>
          </div>
          <div className="footer-inner-top-3">
            <h6 className="footer-title">{t('travellers')}</h6>
            <div>
              <ul className="footer-list-links">
                <li>
                  <Link href="/tours/all/1" className="footer-list-link">
                    {t('tours')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-inner-two">
        <div className="container">
          <div className="footer-inner-two-txt">
            © 2023 Tourism Concept. {t('privacy_text')}.
            <span>ㅤ{t('privacy')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
