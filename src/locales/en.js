export default {
  translation: {
    main: {
      header: 'RSS aggregator',
      lead: "Start reading RSS today! It's easy, it's beautiful.",
      inputPlaceholder: 'RSS link',
      submitBtn: 'Add',
      example: 'Example:',
      exampleUrl: {
        // 1: 'http://lorem-rss.herokuapp.com/feed?unit=second&interval=10', //Test
        1: 'https://www.playground.ru/rss/news.xml',
        2: 'http://www.sports.ru/rss/main.xml',
      },
      validationErrors: {
        notOneOf: 'RSS already exists',
        mustBeUrl: 'The link must be a valid URL',
        invalidRSS: 'The resource does not contain valid RSS',
      },
      loading: 'Loading',
      loaded: 'RSS successfully loaded',
      deleted: 'Feed was deleted',
      deletedAll: 'All feeds were deleted',
      unknownError: 'Unknown error. Something goes wrong.',
    },
    modal: {
      btnRead: 'Read more...',
      btnClose: 'Close',
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
      changed: 'Language changed',
      ru: 'Ru',
      en: 'En',
    },
  },
};
