import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import InviteSpeaker from './inviteSpeaker'

const mapStore = (store, props, { router }) => {
  const talkId = router.getRouteParam('talkId')
  const uidInvite = router.getRouteParam('uid')
  const { uid } = store.auth.get()
  const { title } = store.data.talks.get(talkId) || {}
  return {
    loaded: store.data.talks.hasKey(talkId) && store.data.users.hasKey(uidInvite),
    title,
    uidInvite,
    join: () => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      router.push(`/speaker/talk/${talkId}`)
    },
    cancel: () => router.push('/speaker'),
  }
}

export default compose(
  forRoute.absolute('INVITE_SPEAKER'), //
  inject(mapStore), //
  loader, //
)(InviteSpeaker)
