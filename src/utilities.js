/* eslint-disable no-param-reassign */
import _ from 'lodash';

const addIdToPosts = (items, feedId) => {
  const postsWithId = items.map((item) => {
    item.id = _.uniqueId();
    item.feedId = feedId;
    return item;
  });
  return postsWithId;
};

const addProxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.set('url', url);
  proxyUrl.searchParams.set('disableCache', 'true');
  return proxyUrl.toString();
};

export { addIdToPosts, addProxy };
