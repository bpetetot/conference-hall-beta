import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import Speaker from './speaker'

const mapState = () => ({
  existSpeaker: true,
  fullname: 'Benjamin Petetot',
  avatar:
    'https://lh6.googleusercontent.com/-eLNPp-cIkYU/AAAAAAAAAAI/AAAAAAAAK0g/GSqGVZIugwk/photo.jpg',
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_SPEAKER' }),
})

export default compose(connect(mapState, mapDispatch), loader({ existSpeaker: ['loaded'] }))(Speaker)
