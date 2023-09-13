import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div id="footer" className="footer border-top py-3 mt-5 bg-light">
      <div className="container-xl">
        <div className="text-center">{t('footer.created')}
        <a href={t('footer.authorLink')}>
         {t('footer.authorName')}
        </a> </div>
      </div>
    </div>
  );
};

export default Footer;
