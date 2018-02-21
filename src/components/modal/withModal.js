import { inject } from '@k-ramel/react'

export default id => Component => inject(store => ({
  openModal: () => store.ui.modal.set({ openedModal: id }),
  closeModal: () => store.ui.modal.set({ openedModal: undefined }),
}))(Component)
