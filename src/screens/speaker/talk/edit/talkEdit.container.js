import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'store/reducers/router'
import loader from 'components/loader'
import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-edit'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    form: FORM_NAME,
    initialValues: { ...talk },
    load: () => store.dispatch({ type: 'ON_LOAD_TALK_PAGE' }),
    onSubmit: data => store.dispatch({ type: 'SUBMIT_UPDATE_TALK_FORM', payload: data }),
  }
}

export default compose(
  forRoute.absolute('EDIT_TALK'), //
  inject(mapStore), //
  loader, //
)(TalkForm)
