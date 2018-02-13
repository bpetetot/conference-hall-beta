import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-create'

const mapStore = store => ({
  form: FORM_NAME,
  onSubmit: data => store.dispatch({ type: '@@ui/ON_CREATE_TALK', payload: data }),
})

export default compose(
  forRoute.absolute('CREATE_TALK'), //
  inject(mapStore), //
)(TalkForm)
