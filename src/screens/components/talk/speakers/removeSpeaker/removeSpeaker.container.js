import { inject } from '@k-ramel/react'

import RemoveSpeaker from './removeSpeaker'

const mapStore = (store, { uid }, { router }) => {
  const talkId = router.getPathParam('talkId')
  return {
    onRemoveSpeaker: () => store.dispatch({ type: '@@ui/REMOVE_SPEAKER_TO_TALK', payload: { uid, talkId } }),
  }
}

export default inject(mapStore)(RemoveSpeaker)
