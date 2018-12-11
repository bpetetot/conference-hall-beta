import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import TalkForm from './talkForm'

const mapStore = (store, props, { router }) => {
  const talkId = router.getRouteParam('talkId')
  const talk = store.data.talks.get(talkId)

  return {
    loaded: !!talk,
    initialValues: talk,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
    onSubmit: payload => store.dispatch({ type: '@@ui/ON_UPDATE_TALK', payload }),
  }
}

export default compose(
  forRoute.absolute('EDIT_TALK'), //
  inject(mapStore), //
  loader, //
)(TalkForm)
