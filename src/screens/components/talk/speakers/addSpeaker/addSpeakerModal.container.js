import { inject } from '@k-ramel/react'

import SpeakerModal from './addSpeakerModal'

const mapStore = store => ({
  ...store.ui.speaker.speakerAddModal.get(),
  initialized: store.ui.speaker.speakerAddModal.isInitialized(),
  onSearch: email => store.dispatch({ type: '@@ui/ON_SEARCH_CO_SPEAKER', payload: email }),
})

export default inject(mapStore)(SpeakerModal)
