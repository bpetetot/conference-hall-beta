import { inject } from '@k-ramel/react'
import talkCrud from '../../../../firebase/talks'

import DeleteTalkModal from './deleteTalkModal'

const mapStore = (store, { talkId }) => {
  return {
    deleteTalk: async () => {
      store.data.talks.remove([talkId])
      store.ui.speaker.myTalks.remove([talkId])
      await talkCrud.delete(talkId)
    },
  }
}

export default inject(mapStore)(DeleteTalkModal)
