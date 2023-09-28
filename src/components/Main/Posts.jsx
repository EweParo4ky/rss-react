import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { openModal } from '../../slices/modalSlice';
import { addProxy, addIdToPosts } from '../../utilities';
import { actions as postsActions } from '../../slices/postsSlice';
import parser from '../../parser';

const Posts = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feeds.feeds);
  const postsInState = useSelector((state) => state.posts.posts);
  const viewedPostsIds = new Set(
    useSelector((state) => state.modal.viewedPostsIds),
  );
  console.log('viewedPosts in Posts', viewedPostsIds);
  const { t } = useTranslation();

  const updatePosts = () => {
    const promises = feeds.map(async (feed) => {
      const proxyUrl = addProxy(feed.requestUrl);
      try {
        const response = await axios.get(proxyUrl);
        const data = parser(response.data.contents);
        const postsWithCurrentId = postsInState.filter(
          (post) => post.feedId === feed.id,
        );
        const displayedPostLinks = postsWithCurrentId.map(
          (post) => post.link,
        );
        const newPosts = data.posts.filter(
          (post) => !displayedPostLinks.includes(post.link),
        );
        const newPostsWithID = addIdToPosts(newPosts, feed.id);
        dispatch(postsActions.addPosts(newPostsWithID));
      } catch (error) {
        console.error(error);
      }
    });
    Promise.all(promises);
  };

  useEffect(() => {
    const timeoutUpdate = 10000;
    const intervalPosts = setInterval(() => {
      updatePosts();
    }, timeoutUpdate);

    return () => clearInterval(intervalPosts);
  });

  return (
    <div className="col-md-10 col-lg-8 order-1 posts flex-column h-100 d-flex">
      <div className="card border-0">
        <div className="card-body">
          {postsInState.length !== 0 ? (
            <h2 className="card-title h4">{t('posts.header')}</h2>
          ) : null}
        </div>
        <ul
          className="list-group px-2 mb-3 overflow-auto"
          style={{ maxHeight: '1400px' }}
        >
          {postsInState.map((post) => (
            <li
              className="list-group-item mb-2 d-flex justify-content-between align-items-start border-0 border-end-0 bg-light"
              key={post.id}
            >
              <a
                href={post.link}
                className={`${
                  viewedPostsIds.has(post.id)
                    ? 'fw-normal link-secondary'
                    : 'fw-bold'
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.title}
              </a>
              <button
                type="button"
                className="ml-2 btn btn-outline-primary btn-sm"
                onClick={() => dispatch(openModal(post.id))}
              >
                {t('posts.btn')}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
