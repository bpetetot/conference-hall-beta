import { inject } from '@k-ramel/react'

import { getRouterParam } from 'store/reducers/router'
import SpeakerResults from './speakerResults'

const mapStore = (store) => {
  const talkId = getRouterParam('talkId')(store.getState())
  return {
    onSelectSpeaker: (uid) => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default inject(mapStore)(SpeakerResults)
