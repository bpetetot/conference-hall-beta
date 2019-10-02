import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalInfo from './proposalInfo'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const settings = store.data.eventsSettings.get(eventId)
  const event = store.data.events.get(eventId)

  return {
    deliberationActive: get(settings, 'deliberation.enabled'),
    hideRatings: get(event, 'hideRatings'),
  }
}

export default inject(mapStore)(ProposalInfo)
