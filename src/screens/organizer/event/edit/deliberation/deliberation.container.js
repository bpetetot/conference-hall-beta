import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import DeliberationForm from './deliberation'

const mapStore = (store, { eventId }) => {
  const { contact } = store.data.events.get(eventId) || {}
  const { deliberation, notifications } = store.data.eventsSettings.get(eventId) || {}

  const recipients = notifications && notifications.recipients
  const emails = notifications && notifications.emails

  return {
    deliberationEnabled: deliberation && deliberation.deliberationEnabled,
    displayRatings: deliberation && deliberation.displayRatings,
    contact,
    recipients,
    emails,
    onToggleDeliberation: checked => store.dispatch({
      type: '@@ui/ON_SAVE_EVENT_SETTINGS',
      payload: {
        eventId,
        domain: 'deliberation',
        enabled: checked,
      },
    }),

    onToggleOrganizersRatings: checked => store.dispatch({
      type: '@@ui/ON_SAVE_EVENT_SETTINGS',
      payload: {
        eventId,
        domain: 'deliberation',
        displayRatings: checked,
      },
    }),

    onChangeRecipients: e => store.dispatch({
      type: '@@ui/ON_SAVE_EVENT_SETTINGS',
      payload: {
        eventId,
        domain: 'notifications',
        recipients: {
          ...recipients,
          [e.target.name]: e.target.checked,
        },
      },
    }),

    onChangeNotifiedEmails: e => store.dispatch({
      type: '@@ui/ON_SAVE_EVENT_SETTINGS',
      payload: {
        eventId,
        domain: 'notifications',
        emails: {
          ...emails,
          [e.target.name]: e.target.checked,
        },
      },
    }),
  }
}

export default compose(
  forRoute.absolute('organizer-event-edit-deliberation'),
  inject(mapStore),
)(DeliberationForm)
