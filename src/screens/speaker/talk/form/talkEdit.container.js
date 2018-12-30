import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import TalkForm from './talkForm'

const mapStore = (store, props, { router }) => {
  const talkId = router.getParam('talkId')
  const talk = store.data.talks.get(talkId)

  return {
    loaded: !!talk,
    initialValues: talk,
    submitting: store.ui.loaders.get().isTalkSaving,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_TALK', payload })
    },
  }
}

export default compose(
  forRoute.absolute('speaker-talk-edit'), //
  inject(mapStore), //
  loader, //
)(TalkForm)
