import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as feedsActions } from '../../slices/feedsSlice';
import { actions as postsActions } from '../../slices/postsSlice';
import { setFormStatus, removeUrl } from '../../slices/inputSlice';

const Feeds = () => {
  const feeds = useSelector((state) => state.feeds.feeds);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemove = (feed) => {
    dispatch(feedsActions.removeFeed(feed.id));
    dispatch(postsActions.removePosts(feed.id));
    dispatch(removeUrl(feed.feedLink));
    const feedback = feeds.length === 1 ? t('main.deletedAll') : t('main.deleted');
    dispatch(setFormStatus({
      feedback,
      status: (feeds.length === 1 ? 'deleted' : 'deleting'),
    }));
  };

  return (
    <div className="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds">
      <div className="card border-0">
        <div className="card-body">
          {feeds.length !== 0 ? (
            <h2 className="card-title h4">{t('feeds.header')}</h2>
          ) : null}
        </div>
        <ul
          className="list-group border-0 rounded-0 overflow-auto"
          style={{ maxHeight: '500px' }}
        >
          {feeds.map((feed) => (
            <li
              key={feed.id}
              className="list-group-item mb-2  d-flex justify-content-between align-items-start border-0 border-end-0 bg-light"
            >
              <h3 className="h6 m-0">{feed.feedTitle}</h3>
              <p className="m-0 small text-black-50">
                {feed.feedDescription}
              </p>
              <button
                className="btn btn-sm rm-btn"
                type="button"
                onClick={() => handleRemove(feed)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feeds;
