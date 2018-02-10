import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import eventsData from 'redux/data/events'
import Submission from './submission'

const mapStore = (store, { eventId, talkId }) => {
  const { id, name } = eventsData.get(eventId)(store.getState()) || {}
  return {
    id,
    name,
    load: () => {
      store.dispatch({ type: 'FETCH_EVENT', payload: { eventId } })
    },
    onClickEdit: () => {
      store.dispatch({ type: 'OPEN_SUBMISSION_EVENTINFO_PAGE', payload: { eventId, talkId } })
    },
    onClickEvent: () => {
      store.dispatch({ type: 'SPEAKER/OPEN_EVENT_PAGE', payload: { eventId } })
    },
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Submission)
