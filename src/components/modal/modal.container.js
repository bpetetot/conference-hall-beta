import { inject } from 'k-ramel/react'

import withTheme from 'styles/themes/withTheme'

import Modal from './modal'

const mapStore = (store, { id }) => ({
  opened: store.ui.modal.get().openedModal === id,
  onClose: () => store.ui.modal.set({ openedModal: undefined }),
})

export default inject(mapStore)(withTheme(Modal))
