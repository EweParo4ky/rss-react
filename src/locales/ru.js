export default {
  translation: {
    main: {
      header: 'RSS агрегатор',
      lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
      inputPlaceholder: 'Ссылка RSS',
      submitBtn: 'Добавить',
      example: 'Пример:',
      exampleUrl: {
        // 1: 'http://lorem-rss.herokuapp.com/feed?unit=second&interval=10', //Test
        1: 'https://www.playground.ru/rss/news.xml',
        2: 'http://www.sports.ru/rss/main.xml',
      },
      validationErrors: {
        notOneOf: 'RSS уже существует',
        mustBeUrl: 'Ссылка должна быть валидным URL',
        invalidRSS: 'Ресурс не содержит валидный RSS',
      },
      loading: 'Загрузка',
      loaded: 'RSS успешно загружен',
      deleted: 'Фид удалён',
      deletedAll: 'Все фиды были удалены',
      unknownError: 'Неизвестная ошибка. Что-то пошло не так.',
    },
    modal: {
      btnRead: 'Читать полностью',
      btnClose: 'Закрыть',
    },
    posts: {
      header: 'Посты',
      btn: 'Просмотр',
    },
    feeds: {
      header: 'Фиды',
    },
    footer: {
      created: 'Создано ',
      authorLink: 'https://github.com/EweParo4ky',
      authorName: 'EweParo4ky',
      changed: 'Смена языка',
      ru: 'Ru',
      en: 'En',
    },
  },
};
