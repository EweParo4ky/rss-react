import React from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
// import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../slices/modalSlice';
// import { actions as postsActions } from '../../slices/postsSlice';
// import parser from '../../parser';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const feeds = useSelector((state) => state.feeds.feeds);
  console.log('fedds in POSTS for async', feeds);
  const viewedPostsIds = new Set(useSelector((state) => state.modal.viewedPostsIds));
  const { t } = useTranslation();
  console.log('viewedPosts in Posts', viewedPostsIds);

  // const updatePosts = async () => {
  //   const timeOutUpdate = 5000;
  //   const promises = feeds.map(async (feed) => {
  //     const url = `https://allorigins.hexlet.app/get?url=${feed.feedLink}`;
  //     return axios
  //       .get(url)
  //       .then((response) => {
  //         console.log('RESPONSE############', response);
  //         const paresedData = parser(response.data.contents);
  //         console.log('PARESEDDATA###########', paresedData);
  //         const actualLinksPosts = posts.map((post) => post.link);
  //         const filteredPosts = paresedData.posts.filter(
  //           (post) => !actualLinksPosts.includes(post.link),
  //         );
  //         if (filteredPosts.length > 0) {
  //           const newPosts = filteredPosts.map((post) => ({
  //             ...post,
  //             id: _.uniqueId(),
  //             feedId: feed.id,
  //           }));
  //           dispatch(postsActions.addPosts(newPosts));
  //         }
  //       })
  //       .catch((e) => console.log(`Error: ${e}`));
  //   });
  //   Promise.all(promises).finally(() => setTimeout(() => updatePosts(), timeOutUpdate));
  // };

  // useEffect(() => {
  //   updatePosts();
  // }, [feeds]);

  return (
    <div className="col-md-10 col-lg-8 order-1 mx-auto posts">
      <div className="card border-0 bg-light">
        <div className="card-body">
          {posts.length !== 0 ? (
            <h2 className="card-title h4">{t('posts.header')}</h2>
          ) : null}
        </div>
        <ul className="list-group border-0 rounded-0">
          {posts.map((post) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"
              key={post.id}
            >
              <a href={post.link} className={`${viewedPostsIds.has(post.id) ? 'fw-normal link-secondary' : 'fw-bold'}`} target="_blank" rel="noopener noreferrer">
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
