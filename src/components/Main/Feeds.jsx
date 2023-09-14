import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Feeds = () => {
  const feeds = useSelector((state) => state.feeds);
  const { t } = useTranslation();
  return (
    <div className="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
      <div className="card border-0">
        <div className="card-body">
          {feeds.length !== 0 ? (
            <h2 className="card-title h4">{t('feeds.header')}</h2>
          ) : null}
        </div>
        <ul className="list-group border-0 rounded-0">
          {feeds.map((feed) => {
            console.log('feed', feed);
            return (
              <li
                key={feed.id}
                className="list-group-item border-0 border-end-0"
              >
                <h3 className="h6 m-0">{feed.feedTitle}</h3>
                <p className="m-0 small text-black-50">
                  {feed.feedDescription}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Feeds;
