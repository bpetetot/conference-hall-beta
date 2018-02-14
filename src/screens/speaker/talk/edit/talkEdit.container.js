import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'store/reducers/router'
import loader from 'components/loader'
import TalkForm from '../components/talkForm'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    form: 'talk-edit',
    initialValues: { ...talk },
    load: () => store.dispatch('@@ui/ON_LOAD_TALK'),
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_TALK'),
  }
}

export default compose(
  forRoute.absolute('EDIT_TALK'), //
  inject(mapStore), //
  loader, //
)(TalkForm)
