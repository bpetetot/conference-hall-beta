import { inject } from '@k-ramel/react'

import TalkPage from './talkPage'

const mapStore = (store) => {
  return {
    toggleArchive: (talk) => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_TALK',
        payload: { id: talk.id, archived: !talk.archived },
      })
    },
  }
}

export default inject(mapStore)(TalkPage)
