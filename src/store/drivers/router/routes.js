export default {
  '/': {
    code: 'home',
    base: 'home',

    '/login': { code: 'login' },
    '/beta-access': { code: 'beta-access' },
  },

  '/public': {
    code: 'public',
    base: 'public',
    appTitle: 'Conference Hall',

    '/event/:eventId': { code: 'public-event' },
    '/contributors': { code: 'public-contributors' },
  },

  '/organizer': {
    code: 'HOME_ORGANIZER',
    appTitle: 'Organizer Hall',
    base: 'HOME_ORGANIZER',

    '/profile': { code: 'ORGANIZER_PROFILE' },
    '/event': {
      code: 'HOME_EVENT',
      base: 'HOME_EVENT',
      '/create': { code: 'CREATE_EVENT' },
      '/:eventId': {
        code: 'EVENT_PAGE',
        '/edit': {
          code: 'EDIT_EVENT',
          '/cfp': { code: 'EDIT_EVENT_CFP' },
          '/survey': { code: 'EDIT_EVENT_SURVEY' },
          '/deliberation': { code: 'EDIT_EVENT_DELIBERATION' },
          '/api': { code: 'EDIT_EVENT_API' },
        },
        '/proposals': {
          code: 'PROPOSALS',
          sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
          ratings: ['rated', 'notRated'],
          statuses: ['submitted', 'accepted', 'rejected', 'confirmed', 'declined'],
        },
        '/proposal/:proposalId': { code: 'PROPOSAL' },
      },
    },
    '/organizations': {
      code: 'HOME_ORGANIZATION',
      '/:organizationId': {
        code: 'ORGANIZATION_PAGE',
        '/edit': { code: 'EDIT_ORGANIZATION' },
      },
    },
    '/organization/create': { code: 'CREATE_ORGANIZATION' },
    '/invite/organization/:organizationId/:uid': { code: 'INVITE_ORGANIZER' },
    '/contributors': { code: 'ORGANIZER_CONTRIBUTORS' },
  },

  '/speaker': {
    code: 'HOME_SPEAKER',
    base: 'HOME_SPEAKER',
    appTitle: 'Speaker Hall',

    '/profile': { code: 'SPEAKER_PROFILE' },
    '/talk': {
      code: 'HOME_TALK',
      '/create': { code: 'CREATE_TALK' },
      '/:talkId': {
        code: 'TALK_PAGE',
        '/edit': { code: 'EDIT_TALK' },
        '/submission': { code: 'TALK_SUBMISSION' },
      },
    },
    '/invite/talk/:talkId/:uid': { code: 'INVITE_SPEAKER' },
    '/event': {
      code: 'HOME_EVENT',
      base: 'HOME_EVENT',
      '/:eventId': {
        code: 'SPEAKER_EVENT_PAGE',
        '/submission': { code: 'EVENT_SUBMISSION' },
        '/survey': { code: 'SPEAKER_EVENT_SURVEY' },
      },
    },
    '/contributors': { code: 'SPEAKER_CONTRIBUTORS' },
  },
}
