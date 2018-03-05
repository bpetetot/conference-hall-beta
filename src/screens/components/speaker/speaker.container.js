import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import AvatarLabel from 'components/avatar/avatarLabel'

const mapStore = (store, { id }) => ({
  ...store.data.users.get(id),
  load: () => store.dispatch({ type: '@@ui/FETCH_USER', payload: id }),
})

export default compose(
  inject(mapStore), //
  loader(), //
)(AvatarLabel)
