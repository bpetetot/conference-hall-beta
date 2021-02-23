import { inject } from '@k-ramel/react'
import EventsSelection from './eventsSelection'

const mapStore = (store, { talkId }) => ({
  onSelect: () => {
    store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  },
})

export default inject(mapStore)(EventsSelection)
