import { inject } from 'k-ramel/react'

import Sidebar from './sidebar'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const { displayName } = store.data.users.get(uid) || {}
  return {
    fullname: displayName,
  }
}

export default inject(mapStore)(Sidebar)
