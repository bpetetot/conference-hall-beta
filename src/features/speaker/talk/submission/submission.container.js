import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import Submission from './submission'

const mapStore = (store, { talkId }) => {
  const talk = store.data.talks.get(talkId) || {}
  return {
    loaded: !!talk,
    talkTitle: talk.title,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: talkId }),
  }
}

export default compose(inject(mapStore), loader)(Submission)
