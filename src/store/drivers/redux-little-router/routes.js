export default {
  '/': {
    app: 'conference',
    appTitle: 'Conference Hall',
    title: 'HOME',
    '/login': { title: 'LOGIN' },
    '/beta-access': { title: 'BETA_ACCESS' },
    '/public': {
      app: 'public',
      title: 'PUBLIC',
      '/event/:eventId': { title: 'PUBLIC_EVENT' },
      '/contributors': { title: 'CONTRIBUTORS' },
    },
  },
  '/organizer': {
    app: 'organizer',
    appTitle: 'Organizer Hall',
    title: 'HOME_ORGANIZER',
    '/profile': { title: 'USER_PROFILE' },
    '/event/create': { title: 'CREATE_EVENT' },
    '/event': {
      title: 'HOME_EVENT',
      '/:eventId': {
        title: 'EVENT_PAGE',
        '/edit': {
          title: 'EDIT_EVENT',
          '/cfp': { title: 'EDIT_EVENT_CFP' },
          '/survey': { title: 'EDIT_EVENT_SURVEY' },
          '/deliberation': { title: 'EDIT_EVENT_DELIBERATION' },
          '/api': { title: 'EDIT_EVENT_API' },
        },
        '/proposals': {
          title: 'PROPOSALS',
          sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
          ratings: ['rated', 'notRated'],
          statuses: ['submitted', 'accepted', 'rejected', 'confirmed', 'declined'],
        },
        '/proposal/:proposalId': { title: 'PROPOSAL' },
      },
    },
    '/organizations': {
      title: 'HOME_ORGANIZATION',
      '/:organizationId': {
        title: 'ORGANIZATION_PAGE',
        '/edit': { title: 'EDIT_ORGANIZATION' },
      },
    },
    '/organization/create': { title: 'CREATE_ORGANIZATION' },
    '/invite/organization/:organizationId/:uid': { title: 'INVITE_ORGANIZER' },
    '/contributors': { title: 'CONTRIBUTORS' },
  },
  '/speaker': {
    app: 'speaker',
    appTitle: 'Speaker Hall',
    title: 'HOME_SPEAKER',
    '/profile': { title: 'USER_PROFILE' },
    '/talk/create': { title: 'CREATE_TALK' },
    '/talk': {
      title: 'HOME_TALK',
      '/:talkId': {
        title: 'TALK_PAGE',
        '/edit': { title: 'EDIT_TALK' },
        '/submission': { title: 'TALK_SUBMISSION' },
      },
    },
    '/invite/talk/:talkId/:uid': { title: 'INVITE_SPEAKER' },
    '/event': {
      title: 'HOME_EVENT',
      '/:eventId': {
        title: 'EVENT_PAGE',
        '/submission': { title: 'EVENT_SUBMISSION' },
        '/survey': { title: 'EVENT_SURVEY' },
      },
    },
    '/contributors': { title: 'CONTRIBUTORS' },
  },
}
