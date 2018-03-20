import { inject } from '@k-ramel/react'

import CopyInput from 'components/copyInput'

const mapStore = (store, props, { router }) => {
  const { uid } = store.auth.get()
  const talkId = router.getRouteParam('talkId')
  const url = window.location.href.split('/')
  return {
    title: 'Invite link',
    value: `${url[0]}//${url[2]}/speaker/invite/talk/${talkId}/${uid}`,
  }
}

export default inject(mapStore)(CopyInput)
