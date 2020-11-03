import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import DeliberationForm from './deliberation'

const mapStore = (store, { eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)

  const blindRating = get(settings, 'deliberation.blindRating')
  const deliberationEnabled = get(settings, 'deliberation.enabled')
  const displayRatings = get(settings, 'deliberation.displayRatings')
  const hideRatings = get(settings, 'deliberation.hideRatings')
  const recipients = get(settings, 'notifications.recipients')
  const emails = get(settings, 'notifications.emails')

  return {
    blindRating,
    deliberationEnabled,
    displayRatings,
    hideRatings,
    recipients,
    emails,
    onToggleDeliberation: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'deliberation',
          enabled: checked,
        },
      }),

    onToggleBlindRating: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'deliberation',
          blindRating: checked,
        },
      }),

    onToggleOrganizersRatings: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'deliberation',
          displayRatings: checked,
        },
      }),

    onToggleHideRatings: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'deliberation',
          hideRatings: checked,
        },
      }),

    onChangeRecipients: (e) =>
      store.dispatch({
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

    onChangeNotifiedEmails: (e) =>
      store.dispatch({
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

export default inject(mapStore)(DeliberationForm)
