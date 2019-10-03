import { compose } from 'redux'
import { inject, listen } from '@k-ramel/react'

import loader from 'components/loader'

import listeners from '../../../proposals/proposals.listeners'

import ProposalsField from './proposalsField'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    proposals: store.data.proposals.getAsArray(),
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS'),
  }
}

export default compose(inject(mapStore), listen(listeners, 'PROPOSALS'), loader)(ProposalsField)
