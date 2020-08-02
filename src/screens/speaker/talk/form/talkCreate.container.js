import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import TalkForm from './talkForm'

const mapStore = (store, { userId }) => ({
  submitting: store.ui.loaders.get().isTalkSaving,
  onSubmit: (data) => {
    store.dispatch({ type: '@@ui/ON_CREATE_TALK', payload: { userId, data } })
  },
})

export default compose(
  forRoute.absolute('speaker-talk-create'), //
  inject(mapStore), //
)(TalkForm)
