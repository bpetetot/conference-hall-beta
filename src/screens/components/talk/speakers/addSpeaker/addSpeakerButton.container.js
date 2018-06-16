import { inject } from '@k-ramel/react'
import AddSpeakerButton from './addSpeakerButton'

const mapStore = (store, props, { router }) => {
  const { uid: authId } = store.auth.get()
  const { origin } = window.location
  const talkId = router.getRouteParam('talkId')
  return {
    inviteLink: `${origin}/speaker/invite/talk/${talkId}/${authId}`,
    onSelectUser: (uid) => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default inject(mapStore)(AddSpeakerButton)
