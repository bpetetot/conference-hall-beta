import { connect } from 'react-redux'

import { openModal, closeModal } from 'redux/ui/modal'
import FormatsForm from './formatsForm'

const mapDispatch = dispatch => ({
  openModal: id => () => dispatch(openModal(id)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(undefined, mapDispatch)(FormatsForm)
