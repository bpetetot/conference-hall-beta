import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-create'

const mapStore = store => ({
  form: FORM_NAME,
  onSubmit: data => store.dispatch({ type: 'SUBMIT_CREATE_TALK_FORM', payload: data }),
})

export default compose(
  forRoute.absolute('CREATE_TALK'), //
  inject(mapStore), //
)(TalkForm)
