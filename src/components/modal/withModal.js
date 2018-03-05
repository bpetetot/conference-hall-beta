import { inject } from '@k-ramel/react'

export default id => Component => inject((store, { modalId }) => ({
  openModal: () => store.ui.modal.set({ openedModal: id || modalId }),
  closeModal: () => store.ui.modal.set({ openedModal: undefined }),
}))(Component)
