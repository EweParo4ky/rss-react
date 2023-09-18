import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toogleModal } from '../../slices/modalSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const { t } = useTranslation();
  console.log('posts in Posts', posts);
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
              <a href="post.link" className="fw-bold" rel="noopener noreferrer">
                {post.title}
              </a>
              <button
                type="button"
                className="ml-2 btn btn-outline-primary btn-sm"
                onClick={() => dispatch(toogleModal(post.id))}
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
