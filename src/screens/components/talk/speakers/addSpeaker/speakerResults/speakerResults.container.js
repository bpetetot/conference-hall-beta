import { inject } from '@k-ramel/react'

import SpeakerResults from './speakerResults'

const mapStore = (store, props, { router }) => {
  const talkId = router.getRouteParam('talkId')
  return {
    onSelectSpeaker: (uid) => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default inject(mapStore)(SpeakerResults)
