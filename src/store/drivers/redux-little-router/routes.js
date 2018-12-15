export default {
  '/': {
    app: 'conference',
    appTitle: 'Conference Hall',
    base: 'HOME',
    code: 'HOME',
    '/login': { code: 'LOGIN' },
    '/beta-access': { code: 'BETA_ACCESS' },
    '/public': {
      app: 'public',
      base: 'PUBLIC',
      code: 'PUBLIC',
      '/event/:eventId': { code: 'PUBLIC_EVENT' },
      '/contributors': { code: 'CONTRIBUTORS' },
    },
  },
  '/organizer': {
    app: 'organizer',
    appTitle: 'Organizer Hall',
    base: 'HOME_ORGANIZER',
    code: 'HOME_ORGANIZER',
    '/profile': { code: 'ORGANIZER_PROFILE' },
    '/event/create': { code: 'CREATE_EVENT' },
    '/event': {
      code: 'HOME_EVENT',
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
    '/contributors': { code: 'CONTRIBUTORS' },
  },
  '/speaker': {
    app: 'speaker',
    appTitle: 'Speaker Hall',
    base: 'HOME_SPEAKER',
    code: 'HOME_SPEAKER',
    '/profile': { code: 'SPEAKER_PROFILE' },
    '/talk/create': { code: 'CREATE_TALK' },
    '/talk': {
      code: 'HOME_TALK',
      '/:talkId': {
        code: 'TALK_PAGE',
        '/edit': { code: 'EDIT_TALK' },
        '/submission': { code: 'TALK_SUBMISSION' },
      },
    },
    '/invite/talk/:talkId/:uid': { code: 'INVITE_SPEAKER' },
    '/event': {
      code: 'HOME_EVENT',
      '/:eventId': {
        code: 'SPEAKER_EVENT_PAGE',
        '/submission': { code: 'EVENT_SUBMISSION' },
        '/survey': { code: 'SPEAKER_EVENT_SURVEY' },
      },
    },
    '/contributors': { code: 'CONTRIBUTORS' },
  },
}
