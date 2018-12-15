import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import listeners from './inviteSpeaker.listeners'
import InviteSpeaker from './inviteSpeaker'

const mapStore = (store, props, { router }) => {
  const talkId = router.getPathParam('talkId')
  const uidInvite = router.getPathParam('uid')
  const { uid } = store.auth.get()
  const { title } = store.data.talks.get(talkId) || {}
  return {
    loaded: store.data.talks.hasKey(talkId) && store.data.users.hasKey(uidInvite),
    title,
    uidInvite,
    join: () => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      router.push('TALK_PAGE', { talkId })
    },
    cancel: () => router.push('HOME_SPEAKER'),
  }
}

export default compose(
  forRoute.absolute('INVITE_SPEAKER'),
  inject(mapStore),
  listen(listeners, 'INVITE_SPEAKER'),
  loader,
)(InviteSpeaker)
