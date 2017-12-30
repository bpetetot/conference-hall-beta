import { connect } from 'react-redux'
import { isOrganizerRoute, isSpeakerRoute } from 'redux/routes'
import classnames from 'classnames'

const mapState = (state, { className }) => ({
  className: classnames('default-theme', className, {
    'red-theme': isOrganizerRoute(state),
    'blue-theme': isSpeakerRoute(state),
  }),
})

export default connect(mapState)
