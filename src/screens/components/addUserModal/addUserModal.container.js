import { inject } from '@k-ramel/react'

import UserModal from './addUserModal'

const mapStore = (store) => ({
  ...store.ui.userAddModal.get(),
  initialized: store.ui.userAddModal.isInitialized(),
  onSearch: (email) => store.dispatch({ type: '@@ui/ON_SEARCH_USER', payload: email }),
})

export default inject(mapStore)(UserModal)
