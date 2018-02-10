import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import usersData from 'redux/data/users'
import Speaker from './speaker'

const mapStore = (store, { id }) => {
  const { displayName, photoURL } = usersData.get(id)(store.getState()) || {}
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
