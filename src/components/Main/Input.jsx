/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import parser from '../../parser';
import { actions as feedsActions } from '../../slices/feedsSlice';
import { actions as postsActions } from '../../slices/postsSlice';

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
  const store = useSelector((state) => state);
  console.log('state', store);
  const { t } = useTranslation();
  const inputRef = useRef();
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [validationErrors, setValidationError] = useState('');
  // console.log('urls', urls);

  const handleChangeValue = (e) => setInputValue(e.target.value);

  const validateUrl = (url, linksList) => {
    const schema = yup
      .string()
      .trim()
      .url(t('main.validationErrors.mustBeUrl'))
      .notOneOf(linksList, t('main.validationErrors.notOneOf'));
    return schema.validate(url);
  };

  const formik = useFormik({
    initialValues: {
      inputUrl: '',
    },
    onSubmit: async () => {
      try {
        const validatedUrl = await validateUrl(inputValue, urls);
        setUrls([...urls, validatedUrl]);
        const response = await axios.get(
          `https://allorigins.hexlet.app/get?url=${validatedUrl}`,
        );
        console.log('response', response);
        const parsedData = parser(response.data.contents);
        console.log('parsedData in input', parsedData);
        const { feed, posts } = parsedData;
        feed.id = _.uniqueId();
        const postsWithId = addIdToPosts(posts, feed.id);
        dispatch(feedsActions.addFeed(feed));
        dispatch(postsActions.addPosts(postsWithId));

        console.log('postsWithId', postsWithId);
        setValidationError('');
        setInputValue('');
      } catch (error) {
        setValidationError(error.message);
        console.log(error);
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
                  onChange={handleChangeValue}
                  value={inputValue}
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
        <ul
          className="mt-2 mb-0 text-info ps-0"
          style={{ listStyleType: 'none' }}
        >
          <span className="text-light">
            {t('main.example')}
          </span>
          <li>
            <a href="inputUrl" className="text-info">
              {t('main.exampleUrl.1')}
            </a>
          </li>
          <li>
            <a href="inputUrl" className="text-info">
              {t('main.exampleUrl.2')}
            </a>
          </li>
        </ul>
        <p className="feedback m-0 position-absolute small text-danger">
          {validationErrors}
        </p>
      </div>
    </div>
  );
};

export default Input;
