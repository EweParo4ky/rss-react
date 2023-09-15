export default {
  translation: {
    main: {
      header: 'RSS aggregator',
      lead: "Start reading RSS today! It's easy, it's beautiful.",
      inputPlaceholder: 'RSS link',
      submitBtn: 'Add',
      example: 'Example:',
      exampleUrl: {
        1: 'https://ru.hexlet.io/lessons.rss',
        2: 'http://www.sports.ru/rss/main.xml',
      },
      validationErrors: {
        notOneOf: 'RSS already exists',
        mustBeUrl: 'The link must be a valid URL',
        invalidRSS: 'The resource does not contain valid RSS',
      },
      loaded: 'RSS successfully loaded',
      deleted: 'Feed was deleted',
      deletedAll: 'All feeds were deleted',
    },
    posts: {
      header: 'Posts',
      btn: 'View',
    },
    feeds: {
      header: 'Feeds',
    },
    footer: {
      created: 'Created by ',
      authorLink: 'https://github.com/EweParo4ky',
      authorName: 'EweParo4ky',
    },
  },
};
