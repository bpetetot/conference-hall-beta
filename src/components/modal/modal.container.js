import { connect } from 'react-redux'

import withTheme from 'styles/themes/withTheme'
import { isModalOpened, closeModal } from 'redux/ui/modal'

import Modal from './modal'

const mapState = (state, { id }) => ({
  opened: isModalOpened(state)(id),
})

const mapDispatch = dispatch => ({
  onClose: () => dispatch(closeModal()),
})

export default connect(mapState, mapDispatch)(withTheme(Modal))
