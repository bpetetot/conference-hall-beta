import { inject } from '@k-ramel/react'

import { getRouterParam } from 'store/reducers/router'
import CopyInput from 'components/copyInput'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const talkId = getRouterParam('talkId')(store.getState())
  const url = window.location.href.split('/')
  return {
    title: 'Invite link',
    value: `${url[0]}//${url[2]}/speaker/invite/talk/${talkId}/${uid}`,
  }
}

export default inject(mapStore)(CopyInput)
