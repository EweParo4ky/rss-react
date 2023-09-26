/* eslint-disable no-param-reassign */
import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import parser from '../../parser';
import { actions as feedsActions } from '../../slices/feedsSlice';
import { actions as postsActions } from '../../slices/postsSlice';
import { setUrls, setInputValue, setFormStatus } from '../../slices/inputSlice';
import { addIdToPosts, addProxy } from '../../utilities';

const Input = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const urls = useSelector((state) => state.input.urls);
  const inputValue = useSelector((state) => state.input.inputValue);
  const formStatus = useSelector((state) => state.input.formStatus);
  console.log('state', store);
  const { t } = useTranslation();
  const inputRef = useRef();
  console.log('formStatus in input', formStatus);
  console.log('urls', urls);

  const handleChangeValue = (e) => dispatch(setInputValue(e.target.value));
  const handleClick = (e) => {
    const value = e.target.textContent;
    dispatch(setInputValue(value));
  };

  const validateUrl = (link, linksList) => {
    const schema = yup
      .string()
      .trim()
      .url(t('main.validationErrors.mustBeUrl'))
      .notOneOf(linksList, t('main.validationErrors.notOneOf'));
    return schema.validate(link);
  };

  const formik = useFormik({
    initialValues: {
      inputUrl: '',
    },
    onSubmit: async () => {
      dispatch(setFormStatus({
        status: 'loading',
        feedback: t('main.loading'),
      }));
      try {
        const validatedUrl = await validateUrl(inputValue, urls);
        console.log(validatedUrl, 'validatedUrl');
        dispatch(setUrls(validatedUrl));
        const response = await axios.get(
          addProxy(validatedUrl),
        );
        console.log('response', response);
        const parsedData = parser(response.data.contents);
        // console.log('parsedData in input', parsedData);
        const { feed, posts } = parsedData;
        feed.requestUrl = response.data.status.url;
        feed.id = _.uniqueId();
        const postsWithId = addIdToPosts(posts, feed.id);
        dispatch(feedsActions.addFeed(feed));
        dispatch(postsActions.addPosts(postsWithId));
        // console.log('postsWithId', postsWithId);
        dispatch(setFormStatus({
          status: 'loaded',
          feedback: t('main.loaded'),
        }));
        dispatch(setInputValue(''));
      } catch (error) {
        if (error.isParserError) {
          dispatch(setFormStatus({
            status: 'failed',
            feedback: t('main.validationErrors.invalidRSS'),
          }));
        } else {
          dispatch(setFormStatus({
            status: 'failed',
            feedback: error.message,
          }));
        }
        console.error(error.isParserError);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [urls]);

  const handleFeedBack = (status) => {
    const variant = {
      feeling: null,
      loading: 'text-warning',
      loaded: 'text-success',
      failed: 'text-danger',
      deleting: 'text-warning',
      deleted: 'text-danger',
    };
    return variant[status];
  };

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
                    formik.touched.inputUrl && formStatus.status === 'failed'
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
                className={`h-100 btn btn-lg btn-primary px-sm-5 ${formStatus.status === 'loading' ? 'disabled' : null}`}
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
          <span className="text-light">{t('main.example')}</span>
          <li>
            <button
              type="button"
              onClick={(e) => handleClick(e)}
              className="text-info btn btn-dark"
            >
              {t('main.exampleUrl.1')}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-info btn btn-dark"
              onClick={(e) => handleClick(e)}
            >
              {t('main.exampleUrl.2')}
            </button>
          </li>
        </ul>
        <p className={`feedback m-0 position-absolute small ${handleFeedBack(formStatus.status)}`}>
          {formStatus.feedback}
          {/* Реализовать перевод фидбека при переключении языка */}
        </p>
      </div>
    </div>
  );
};

export default Input;
