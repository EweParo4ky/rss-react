const getFeed = (parsedData) => {
  const feedTitle = parsedData.querySelector('title').textContent;
  const feedLink = parsedData.querySelector('link').textContent;
  const feedDescription = parsedData.querySelector('description').textContent;
//   const feedImg = parsedData.querySelector('image');
//   const imgUrl = feedImg.querySelector('url').textContent;
  return { feedTitle, feedLink, feedDescription };
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
  })
  console.log('posts in parser', posts);
  return posts;
};

const parser = (data) => {
  const parserInstance = new DOMParser();
  const parsedData = parserInstance.parseFromString(data, 'text/xml');
  const parseError = parsedData.querySelector('parsererror');
  if (parseError) {
    const err = new Error(parseError.textContent);
    err.isParserError = true;
    throw err;
  }
  const feed = getFeed(parsedData);
  const posts = getPosts(parsedData);
  console.log('parsedData in parser', parsedData);
  return { feed, posts };
};

export default parser;
