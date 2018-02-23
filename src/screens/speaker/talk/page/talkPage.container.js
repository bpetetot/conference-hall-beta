import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import TalkPage from './talkPage'

const mapStore = (store, props, { router }) => {
  const talkId = router.getRouteParam('talkId')
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    ...talk,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
  }
}

export default compose(
  forRoute.absolute('TALK_PAGE'), //
  inject(mapStore), //
  loader, //
)(TalkPage)
