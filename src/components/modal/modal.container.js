import { inject } from 'k-ramel/react'

import withTheme from 'styles/themes/withTheme'
import { isModalOpened, closeModal } from 'redux/ui/modal'

import Modal from './modal'

const mapStore = (store, { id }) => ({
  opened: isModalOpened(store.getState())(id),
  onClose: () => store.dispatch(closeModal()),
})

export default inject(mapStore)(withTheme(Modal))
