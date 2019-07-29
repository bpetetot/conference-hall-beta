import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalInfo from './proposalInfo'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const settings = store.data.eventsSettings.get(eventId)
  return { deliberationActive: get(settings, 'deliberation.enabled') }
}

export default inject(mapStore)(ProposalInfo)
