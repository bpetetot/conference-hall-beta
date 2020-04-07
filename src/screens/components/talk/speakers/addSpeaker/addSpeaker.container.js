import { inject } from '@k-ramel/react'

import AddSpeaker from './addSpeaker'

const mapStore = (store, props, { router }) => {
  const talkId = router.getParam('talkId')
  const { title } = store.data.talks.get(talkId) || {}
  return {
    talkId,
    talkName: title,
    onSelectUser: (uid) => {
      store.dispatch({ type: '@@ui/ADD_SPEAKER_TO_TALK', payload: { uid, talkId } })
    },
  }
}

export default inject(mapStore)(AddSpeaker)
