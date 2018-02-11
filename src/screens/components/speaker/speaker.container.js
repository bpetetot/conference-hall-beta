import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Speaker from './speaker'

const mapStore = (store, { id }) => {
  const { displayName, photoURL } = store.data.users.get(id) || {}
  return {
    displayName,
    photoURL,
    load: () => store.dispatch({ type: 'FETCH_USER', payload: id }),
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Speaker)
