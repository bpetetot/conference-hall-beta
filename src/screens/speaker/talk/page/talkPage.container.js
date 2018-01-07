import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import talksData from 'redux/data/talks'
import LoadingIndicator from 'components/loading'
import TalkPage from './talkPage'

const mapState = (state) => {
  const { id } = state.router.params
  const talk = talksData.get(id)(state)
  return {
    loaded: !!talk,
    ...talk,
  }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK_FROM_ROUTER_PARAMS' }),
})

export default compose(
  forRoute('TALK_PAGE', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkPage)
