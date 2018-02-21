import { inject } from '@k-ramel/react'

import { getRouterParam } from 'store/reducers/router'
import RemoveSpeaker from './removeSpeaker'

const mapStore = (store, { uid }) => {
  const talkId = getRouterParam('talkId')(store.getState())
  return {
    onRemoveSpeaker: () => {
      store.dispatch({ type: '@@ui/REMOVE_SPEAKER_TO_TALK', payload: { uid, talkId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default inject(mapStore)(RemoveSpeaker)
