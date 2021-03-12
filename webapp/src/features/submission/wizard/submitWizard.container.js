import { inject } from '@k-ramel/react'

import SubmitWizard from './submitWizard'

const mapStore = (store) => {
  const { currentStep } = store.ui.speaker.submission.get()
  return { currentStep }
}

export default inject(mapStore)(SubmitWizard)
