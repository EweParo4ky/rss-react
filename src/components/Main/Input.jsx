import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import parser from '../../parser';
import { actions as feedsActions } from '../../slices/feedsSlice';
import { actions as postsActions} from '../../slices/postsSlice'

const addIdToPosts = (items, feedId) => {
  const postsWithId = items.map((item) => {
    item.id = _.uniqueId();
    item.feedId = feedId;
    return item;
  });
  return postsWithId;
};


const Input = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log('state', state);
  const { t } = useTranslation();
  const inputRef = useRef();
  const [urls, setUrls] = useState([]);
  // console.log('urls', urls);

  const validationSchema = yup.object().shape({
    inputUrl: yup
      .string()
      .trim()
      .url(t('main.validationErrors.mustBeUrl'))
      .notOneOf(urls, t('main.validationErrors.notOneOf')),
  });

  const formik = useFormik({
    initialValues: {
      inputUrl: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setUrls([...urls, values.inputUrl]);
        const response = await axios.get(
          `https://allorigins.hexlet.app/get?url=${values.inputUrl}`
        );
        console.log('response', response);
        const parsedData = parser(response.data.contents);
        console.log('parsedData in input', parsedData);
        const { feed, posts } = parsedData;
        feed.id = _.uniqueId();
        const postsWithId = addIdToPosts(posts, feed.id);
        dispatch(feedsActions.addFeed(feed));
        console.log('postsWithId', postsWithId);
        dispatch(postsActions.addPosts(postsWithId));

        console.log('postsWithId', postsWithId);
        values.inputUrl = '';
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10 col-lg-8 mx-auto text-white">
        <h1 className="display-3 mb-0">{t('main.header')}</h1>
        <p className="lead">{t('main.lead')}</p>
        <form className="rss-form text-body" onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-floating">
                <input
                  className={`form-control w-100 ${
                    formik.touched.inputUrl && formik.errors.inputUrl
                      ? 'is-invalid'
                      : ''
                  }`}
                  id="inputUrl"
                  name="inputUrl"
                  type="text"
                  ref={inputRef}
                  required
                  autoComplete="off"
                  placeholder={t('main.inputPlaceholder')}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.inputUrl}
                />
                <label htmlFor="inputUrl">{t('main.inputPlaceholder')}</label>
              </div>
            </div>
            <div className="col-auto">
              <button
                className="h-100 btn btn-lg btn-primary px-sm-5"
                type="submit"
              >
                {t('main.submitBtn')}
              </button>
            </div>
          </div>
        </form>
        <ul className="mt-2 mb-0 text-info"
            style={{listStyleType:'none'}}
        >
          <span className="text-light">{t('main.example')} </span> 
          <li>{t('main.exampleUrl.1')}</li>
          <li>{t('main.exampleUrl.2')}</li>
          </ul>
        <p className="feedback m-0 position-absolute small text-danger">
          {formik.errors.inputUrl}
        </p>
      </div>
    </div>
  );
};

export default Input;
