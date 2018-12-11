import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import TalkForm from './talkForm'

const mapStore = store => ({
  onSubmit: payload => store.dispatch({ type: '@@ui/ON_CREATE_TALK', payload }),
})

export default compose(
  forRoute.absolute('CREATE_TALK'), //
  inject(mapStore), //
)(TalkForm)
