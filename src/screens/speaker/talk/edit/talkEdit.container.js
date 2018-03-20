import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-edit'

const mapStore = (store, props, { router }) => {
  const talkId = router.getRouteParam('talkId')
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    form: FORM_NAME,
    initialValues: talk,
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_TALK'),
  }
}

export default compose(
  forRoute.absolute('EDIT_TALK'), //
  inject(mapStore), //
  loader, //
)(TalkForm)
