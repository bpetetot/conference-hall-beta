import { compose } from 'redux'
import { inject } from 'k-ramel/react'

import { getSubmission } from 'redux/ui/speaker/submission'
import TalkPage from './talkPage'

const mapStore = (store, { eventId }) => {
  const { talkId } = getSubmission(store.getState())
  const event = store.data.events.get(eventId)
  const talk = store.data.talks.get(talkId)
  if (talk.submissions && talk.submissions[event.id]) {
    return {
      id: talkId,
      ...talk.submissions[event.id],
      onNext: () => store.dispatch({ type: 'SUBMISSION_NEXT_STEP' }),
    }
  }
  return { id: talkId, ...talk, onNext: () => store.dispatch({ type: 'SUBMISSION_NEXT_STEP' }) }
}

export default compose(inject(mapStore))(TalkPage)
