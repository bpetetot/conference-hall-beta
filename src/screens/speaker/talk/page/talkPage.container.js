import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import talksData from 'redux/data/talks'
import loader from 'components/loader'
import TalkPage from './talkPage'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
  const talk = talksData.get(talkId)(store.getState())
  return {
    loaded: !!talk,
    ...talk,
    load: () => store.dispatch({ type: 'ON_LOAD_TALK_PAGE' }),
  }
}

export default compose(
  forRoute.absolute('TALK_PAGE'), //
  inject(mapStore), //
  loader, //
)(TalkPage)
