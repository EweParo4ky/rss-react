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

export default addIdToPosts;
