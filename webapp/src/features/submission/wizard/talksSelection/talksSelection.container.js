import { inject } from '@k-ramel/react'
import TalksSelection from './talksSelection'

const mapStore = (store) => {
  return {
    onSelect: (talkId) => {
      store.ui.speaker.submission.set({ talkId, currentStep: 1 })
    },
  }
}

export default inject(mapStore)(TalksSelection)
