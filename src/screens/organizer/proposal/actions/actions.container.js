/* eslint-disable prefer-destructuring */
import { inject } from '@k-ramel/react'

import Actions from './actions'

const mapStore = (store) => {
  const proposals = store.data.proposals.getKeys()
  const { proposalIndex } = store.ui.organizer.proposal.get()
  return {
    hasNext: proposalIndex + 1 < proposals.length,
    hasPrevious: proposalIndex - 1 >= 0,
    onNext: () => store.dispatch('@@ui/ON_NEXT_PROPOSAL'),
    onPrevious: () => store.dispatch('@@ui/ON_PREVIOUS_PROPOSAL'),
  }
}

export default inject(mapStore)(Actions)
