import { connect } from 'react-redux'

import { openModal, closeModal } from 'redux/ui/modal'
import CategoriesForm from './categoriesForm'

const mapDispatch = dispatch => ({
  openModal: id => () => dispatch(openModal(id)),
  closeModal: () => dispatch(closeModal()),
})

export default connect(undefined, mapDispatch)(CategoriesForm)
