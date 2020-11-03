import { inject } from '@k-ramel/react'

import SubmitTalkLink from './submitTalkLink'

const mapStore = (store) => {
  return { onClick: () => store.ui.speaker.submission.reset() }
}

export default inject(mapStore)(SubmitTalkLink)
