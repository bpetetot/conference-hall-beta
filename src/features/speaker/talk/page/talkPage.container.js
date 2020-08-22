import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import TalkPage from './talkPage'

const mapStore = (store, { talkId }) => {
  const talk = store.data.talks.get(talkId)
  return {
    loaded: !!talk,
    ...talk,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: talkId }),
    toggleArchive: () => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_TALK',
        payload: { id: talkId, archived: !talk.archived },
      })
    },
  }
}

export default compose(inject(mapStore), loader)(TalkPage)
