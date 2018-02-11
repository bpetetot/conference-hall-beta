import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Speaker from './speaker'

const mapStore = (store, { uid, id }) => {
  const user = store.data.users.get(uid) || {}
  return {
    ...user,
    load: () => store.dispatch({ type: 'FETCH_USER', payload: id }),
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Speaker)
