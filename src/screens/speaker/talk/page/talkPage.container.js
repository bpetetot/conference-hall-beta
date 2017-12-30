import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import talk from 'redux/data/talk'
import LoadingIndicator from 'components/loading'
import TalkPage from './talkPage'

const mapState = state => ({
  loaded: talk.isInitialized(state),
  ...talk.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK' }),
})

export default compose(
  forRoute('TALK_PAGE', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkPage)
