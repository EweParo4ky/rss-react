import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setFormStatus } from '../../slices/inputSlice';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [currentLng, setCurrentLng] = useState('ru');

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLng(lng);
    dispatch(setFormStatus({ status: 'filling', feedback: t('footer.changed') }));
  };
  return (
    <div
      id="footer"
      className="footer border-top py-3 mt-5 bg-dark mx-auto"
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
            className={`btn btn-primary border-dark ${currentLng === 'ru' ? 'active' : null}`}
            onClick={() => handleChangeLng('ru')}
          >
            {t('footer.ru')}
          </button>
          <button
            type="button"
            className={`btn btn-primary border-dark ${currentLng === 'en' ? 'active' : null}`}
            onClick={() => handleChangeLng('en')}
          >
            {t('footer.en')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
