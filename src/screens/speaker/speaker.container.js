import { connect } from 'react-redux'
import { compose } from 'redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'
import { protect } from 'redux/auth'

import Speaker from './speaker'

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'INIT_SPEAKER_APP' }),
})

export default compose(
  forRoute('HOME_SPEAKER'),
  protect,
  connect(undefined, mapDispatch),
  loader(),
)(Speaker)
