import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import { getTalkFromRouterParam } from 'redux/data/talks'
import LoadingIndicator from 'components/loading'
import TalkPage from './talkPage'

const mapState = (state) => {
  const talk = getTalkFromRouterParam(state)
  return { loaded: !!talk, ...talk }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK_FROM_ROUTER_PARAMS' }),
})

export default compose(
  forRoute('TALK_PAGE', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkPage)
