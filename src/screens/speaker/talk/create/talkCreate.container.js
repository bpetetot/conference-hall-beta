import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import TalkForm from '../components/talkForm'

const mapStore = store => ({
  form: 'talk-create',
  onSubmit: () => store.dispatch('@@ui/ON_CREATE_TALK'),
})

export default compose(
  forRoute.absolute('CREATE_TALK'), //
  inject(mapStore), //
)(TalkForm)
