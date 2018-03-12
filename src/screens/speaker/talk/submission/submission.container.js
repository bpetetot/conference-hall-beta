import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'store/reducers/router'
import Submission from './submission'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
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
