import React from 'react';
import { useTranslation } from 'react-i18next';
// const handleChangeLng = () => {
// i18n.changeLanguage('en')
// }

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <div
      id="footer"
      className="footer border-top py-3 mt-5 bg-dark mx-auto w-75"
    >
      <div className="container-xl d-flex justify-content-between">
        <div className="text-center text-light">
          {t('footer.created')}
          <a className="text-info" href={t('footer.authorLink')}>
            {t('footer.authorName')}
          </a>
          {' '}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary border-dark active"
            onClick={() => i18n.changeLanguage('ru')}
          >
            RU
          </button>
          <button
            type="button"
            className="btn btn-primary border-dark"
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
