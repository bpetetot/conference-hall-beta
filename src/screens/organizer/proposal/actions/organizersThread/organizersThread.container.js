import { inject } from '@k-ramel/react'

import OrganizersThread from './organizersThread'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  return { user: store.data.users.get(uid) }
}

export default inject(mapStore)(OrganizersThread)
