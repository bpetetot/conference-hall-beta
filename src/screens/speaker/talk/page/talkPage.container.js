import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import talksData from 'redux/data/talks'
import loader from 'components/loader'
import TalkPage from './talkPage'

const mapState = (state) => {
  const talkId = getRouterParam('talkId')(state)
  const talk = talksData.get(talkId)(state)
  return { loaded: !!talk, ...talk }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_TALK_PAGE' }),
})

export default compose(
  forRoute('TALK_PAGE', { absolute: true }), //
  connect(mapState, mapDispatch), //
  loader, //
)(TalkPage)
