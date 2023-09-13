import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import axios from 'axios';

const parser = (data) => {
const parserInstance =  new DOMParser();
return parserInstance.parseFromString(data, "text/xml");
}

const Input = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const [urls, setUrls] = useState([]);
  console.log('urls', urls);

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
      // console.log('values', values);
      try {
        setUrls([...urls, values.inputUrl]);
        const response = await axios.get(
          `https://allorigins.hexlet.app/get?url=${values.inputUrl}`
        );
        console.log('response', response);
        const parsedData = parser(response.data.contents);
        console.log('parsedData', parsedData);
        values.inputUrl = '';
      } catch (error) {
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
        <p className="mt-2 mb-0 text-info">Пример: {t('main.example')}</p>
        <p className="feedback m-0 position-absolute small text-danger">
          {formik.errors.inputUrl}
        </p>
      </div>
    </div>
  );
};

export default Input;
