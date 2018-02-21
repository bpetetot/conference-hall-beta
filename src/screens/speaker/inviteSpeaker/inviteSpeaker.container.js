import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'store/reducers/router'
import loader from 'components/loader'
import InviteSpeaker from './inviteSpeaker'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
  const uidInvite = getRouterParam('uid')(store.getState())
  const { uid } = store.auth.get()
  const { title } = store.data.talks.get(talkId) || {}
  return {
    loaded: store.data.talks.hasKey(talkId) && store.data.users.hasKey(uidInvite),
    title,
    uidInvite,
    join: () => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.dispatch(push(`/speaker/talk/${talkId}`))
    },
    cancel: () => store.dispatch(push('/speaker')),
  }
}

export default compose(
  forRoute.absolute('INVITE_SPEAKER'), //
  inject(mapStore), //
  loader, //
)(InviteSpeaker)
