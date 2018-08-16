import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Avatar from 'components/avatar'

const mapStore = (store, { id }) => {
  const { photoURL, displayName } = store.data.users.get(id) || {}
  return ({
    src: photoURL,
    name: displayName,
    withLabel: true,
    load: () => store.dispatch({ type: '@@ui/FETCH_USER', payload: id }),
  })
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Avatar)
