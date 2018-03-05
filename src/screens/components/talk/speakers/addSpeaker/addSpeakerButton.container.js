import { inject } from '@k-ramel/react'
import { getRouterParam } from 'store/reducers/router'
import AddSpeakerButton from './addSpeakerButton'

const mapStore = (store) => {
  const { uid: authId } = store.auth.get()
  const talkId = getRouterParam('talkId')(store.getState())
  const url = window.location.href.split('/')

  return {
    inviteLink: `${url[0]}//${url[2]}/speaker/invite/talk/${talkId}/${authId}`,
    onSelectUser: (uid) => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default inject(mapStore)(AddSpeakerButton)
