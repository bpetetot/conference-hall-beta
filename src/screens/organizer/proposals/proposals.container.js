import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import listeners from './proposals.listeners'
import Proposals from './proposals'

const mapStore = (store, props, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const event = store.data.events.get(eventId)
  const nbProposals = store.data.proposals.getLength()
  const route = router.getResultParam('title')
  return {
    loaded: !!event,
    nbProposals,
    eventId,
    route,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT'),
  }
}

export default compose(
  forRoute('PROPOSALS'),
  inject(mapStore),
  listen(listeners, 'PROPOSALS'),
  loader,
)(Proposals)
