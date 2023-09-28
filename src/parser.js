const getFeed = (parsedData) => {
  const feedTitle = parsedData.querySelector('title').textContent;
  const feedDescription = parsedData.querySelector('description').textContent;
  //   const feedImg = parsedData.querySelector('image');
  //   const imgUrl = feedImg.querySelector('url').textContent;
  return { feedTitle, feedDescription };
};

const getPosts = (parsedData) => {
  const items = parsedData.querySelectorAll('item');
  const arrayOfItems = Array.from(items);
  const posts = arrayOfItems.map((item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;
    return {
      title,
      link,
      description,
    };
  });
  return posts;
};

const parser = (data) => {
  const parserInstance = new DOMParser();
  const parsedData = parserInstance.parseFromString(data, 'application/xml');
  const parseError = parsedData.querySelector('parsererror');
  if (parseError) {
    const err = new Error(parseError.textContent);
    err.isParserError = true;
    throw err;
  }
  const feed = getFeed(parsedData);
  const posts = getPosts(parsedData);
  return { feed, posts };
};

export default parser;
