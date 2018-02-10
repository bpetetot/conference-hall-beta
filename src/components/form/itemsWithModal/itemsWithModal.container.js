import { inject } from 'k-ramel/react'

import { openModal, closeModal } from 'redux/ui/modal'
import ItemsWithModal from './itemsWithModal'

const mapStore = store => ({
  openModal: id => () => store.dispatch(openModal(id)),
  closeModal: () => store.dispatch(closeModal()),
})

export default (name, Form) => inject(mapStore)(ItemsWithModal(name, Form))
