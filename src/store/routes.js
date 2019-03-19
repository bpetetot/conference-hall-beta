/**
 * Routes are managed with k-redux-router integrated with k-ramel
 * Documentation: https://github.com/alakarteio/k-redux-router
 */
export default {
  '/': {
    code: 'home',
    root: 'home',
    title: 'Conference Hall',

    '/login': { code: 'login' },
    '/beta-access': { code: 'beta-access' },

    '/public': {
      code: 'public',
      '/event/:eventId': {
        code: 'public-event',
        isEventPage: true,
      },
      '/contributors': { code: 'public-contributors' },
    },
  },

  '/organizer': {
    code: 'organizer',
    root: 'organizer',
    title: 'Organizer Hall',

    '/profile': { code: 'organizer-profile' },
    '/event': {
      code: 'organizer-event',
      '/create': { code: 'organizer-event-create' },
      '/:eventId': {
        code: 'organizer-event-page',
        isEventPage: true,
        '/edit': {
          code: 'organizer-event-edit',
          '/cfp': { code: 'organizer-event-edit-cfp' },
          '/survey': { code: 'organizer-event-edit-survey' },
          '/deliberation': { code: 'organizer-event-edit-deliberation' },
          '/integrations': { code: 'organizer-event-edit-integrations' },
        },
        '/proposals': {
          code: 'organizer-event-proposals',
          sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
          ratings: ['rated', 'notRated'],
          statuses: ['submitted', 'accepted', 'rejected', 'confirmed', 'declined'],
          '/cards': {
            code: 'organizer-event-proposals-cards',
          },
        },
        '/proposal/:proposalId': { code: 'organizer-event-proposal-page' },
      },
    },
    '/organizations': {
      code: 'organizer-organizations',
      '/create': { code: 'organizer-organization-create' },
      '/:organizationId': {
        code: 'organizer-organization-page',
        '/edit': { code: 'organizer-organization-edit' },
        '/invite/:uid': { code: 'organizer-organization-invite' },
      },
    },
    '/contributors': { code: 'organizer-contributors' },
  },

  '/speaker': {
    code: 'speaker',
    root: 'speaker',
    title: 'Speaker Hall',

    '/profile': { code: 'speaker-profile' },
    '/talk/create': { code: 'speaker-talk-create' },
    '/talk/:talkId': {
      code: 'speaker-talk-page',
      '/edit': { code: 'speaker-talk-edit' },
      '/submission': { code: 'speaker-talk-submission' },
      '/invite/:uid': { code: 'speaker-talk-invite' },
    },
    '/event/:eventId': {
      code: 'speaker-event-page',
      isEventPage: true,
      '/submission': { code: 'speaker-event-submit-wizard' },
      '/submissions': {
        code: 'speaker-event-submissions',
        '/:talkId': {
          code: 'speaker-event-submission-page',
          parentScreen: 'speaker-event-submissions',
        },
      },
      '/survey': { code: 'speaker-event-survey' },
    },
    '/contributors': { code: 'speaker-contributors' },
  },
}
