import { connect } from 'react-redux'

import { openModal, closeModal } from 'redux/ui/modal'
import ItemsWithModal from './itemsWithModal'

const mapDispatch = dispatch => ({
  openModal: id => () => dispatch(openModal(id)),
  closeModal: () => dispatch(closeModal()),
})

export default (name, Form) => connect(undefined, mapDispatch)(ItemsWithModal(name, Form))
