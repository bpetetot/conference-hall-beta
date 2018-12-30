import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import TalkForm from './talkForm'

const mapStore = store => ({
  submitting: store.ui.loaders.get().isTalkSaving,
  onSubmit: (payload) => {
    store.dispatch({ type: '@@ui/ON_CREATE_TALK', payload })
  },
})

export default compose(
  forRoute.absolute('speaker-talk-create'), //
  inject(mapStore), //
)(TalkForm)
