export default {
  '/': {
    app: 'conference',
    appTitle: 'Conference Hall',
    title: 'HOME',
    '/login': { title: 'LOGIN' },
    '/public': {
      title: 'PUBLIC',
      '/event/:eventId': { title: 'PUBLIC_EVENT' },
    },
  },
  '/organizer': {
    app: 'organizer',
    appTitle: 'Organizer Hall',
    title: 'HOME_ORGANIZER',
    '/menu': { title: 'MOBILE_MENU' },
    '/event/create': { title: 'CREATE_EVENT' },
    '/event': {
      title: 'HOME_EVENT',
      '/:eventId': {
        title: 'EVENT_PAGE',
        '/edit': {
          title: 'EDIT_EVENT',
          '/cfp': { title: 'EDIT_EVENT_CFP' },
          '/members': { title: 'EDIT_EVENT_MEMBERS' },
        },
        '/proposals': {
          title: 'PROPOSALS',
          sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
        },
        '/proposal/:proposalId': { title: 'PROPOSAL' },
      },
    },
    '/organizations': {
      title: 'HOME_ORGANIZATION',
      '/:organizationId': { title: 'ORGANIZATION_PAGE' },
    },
    '/organization/create': { title: 'CREATE_ORGANIZATION' },
    '/contributors': { title: 'CONTRIBUTORS' },
  },
  '/speaker': {
    app: 'speaker',
    appTitle: 'Speaker Hall',
    title: 'HOME_SPEAKER',
    '/menu': { title: 'MOBILE_MENU' },
    '/profile': { title: 'SPEAKER_PROFILE' },
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
      },
    },
    '/contributors': { title: 'CONTRIBUTORS' },
  },
}
