import { inject } from 'k-ramel/react'

import { getUser } from 'redux/auth'
import Sidebar from './sidebar'

const mapStore = store => ({
  fullname: getUser(store.getState()).displayName,
})

export default inject(mapStore)(Sidebar)
