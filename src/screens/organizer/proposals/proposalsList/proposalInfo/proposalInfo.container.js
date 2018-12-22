import { inject } from '@k-ramel/react'

import ProposalInfo from './proposalInfo'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const { deliberationActive } = store.data.events.get(eventId) || {}
  return { deliberationActive }
}

export default inject(mapStore)(ProposalInfo)
