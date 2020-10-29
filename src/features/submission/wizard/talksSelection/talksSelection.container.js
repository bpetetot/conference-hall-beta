import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'components/loader'
import TalksSelection from './talksSelection'

const mapStore = (store, { userId }) => {
  const talks = store.ui.speaker.myTalks.getAsArray().filter((talk) => !talk.archived)

  return {
    loaded: store.ui.speaker.myTalks.isInitialized(),
    talks,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_SPEAKER_TALKS', payload: { userId } }),
    onSelect: (talkId) => {
      store.ui.speaker.submission.set({ talkId, currentStep: 1 })
    },
  }
}

export default compose(inject(mapStore), loader)(TalksSelection)
