import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import Submission from './submission'

const mapStore = (store, props, { router }) => {
  const talkId = router.getPathParam('talkId')
  const talk = store.data.talks.get(talkId) || {}
  return {
    loaded: !!talk,
    talkId: talk.id,
    talkTitle: talk.title,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
  }
}

export default compose(
  forRoute('TALK_SUBMISSION'), //
  inject(mapStore), //
  loader, //
)(Submission)
