import { inject } from '@k-ramel/react'

import ItemsWithModal from './itemsWithModal'

const mapStore = store => ({
  openModal: id => () => store.ui.modal.set({ openedModal: id }),
  closeModal: () => store.ui.modal.set({ openedModal: undefined }),
})

export default (name, Form) => inject(mapStore)(ItemsWithModal(name, Form))
