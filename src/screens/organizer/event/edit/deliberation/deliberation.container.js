import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import get from 'lodash/get'

import DeliberationForm from './deliberation'

const mapStore = (store, { eventId }) => {
  const { contact } = store.data.events.get(eventId) || {}
  const settings = store.data.eventsSettings.get(eventId)

  const deliberationEnabled = get(settings, 'deliberation.enabled')
  const displayRatings = get(settings, 'deliberation.displayRatings')
  const recipients = get(settings, 'notifications.recipients')
  const emails = get(settings, 'notifications.emails')

  return {
    deliberationEnabled,
    displayRatings,
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
