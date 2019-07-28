import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import DeliberationForm from './deliberation'

const mapStore = (store, { eventId }) => {
  const {
    deliberationActive, displayOrganizersRatings, contact, sendEmailsTo, emails,
  } = store.data.events.get(eventId) || {}

  return {
    deliberationActive,
    displayOrganizersRatings,
    contact,
    emails,
    sendEmailsTo,
    onActiveDeliberation: checked => store.dispatch({
      type: '@@ui/ON_TOGGLE_EVENT_DELIBERATION',
      payload: {
        event: {
          id: eventId,
          deliberationActive: checked,
        },
      },
    }),

    onDisplayOrganizersRatings: checked => store.dispatch({
      type: '@@ui/ON_TOGGLE_EVENT_DISPLAY_ORGANIZERS_RATINGS',
      payload: {
        event: {
          id: eventId,
          displayOrganizersRatings: checked,
        },
      },
    }),

    onChangeSendTo: e => store.dispatch({
      type: '@@ui/ON_CHANGE_EMAIL_DESTINATION',
      payload: {
        event: {
          id: eventId,
          sendEmailsTo: {
            ...sendEmailsTo,
            [e.target.name]: e.target.checked,
          },
        },
      },
    }),

    onChangeEmails: e => store.dispatch({
      type: '@@ui/ON_CHANGE_EMAIL_NOTIFICATION',
      payload: {
        event: {
          id: eventId,
          emails: {
            ...emails,
            [e.target.name]: e.target.checked,
          },
        },
      },
    }),
  }
}

export default compose(
  forRoute.absolute('organizer-event-edit-deliberation'),
  inject(mapStore),
)(DeliberationForm)
