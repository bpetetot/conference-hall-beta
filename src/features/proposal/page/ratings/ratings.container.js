/* eslint-disable prefer-destructuring */
import { inject } from '@k-ramel/react'

import Ratings from './ratings'

const mapStore = (store, { proposalId }) => {
  const proposals = store.data.proposals.getKeys()
  const proposalIndex = proposals.indexOf(proposalId)
  const nextProposalId =
    proposalIndex + 1 < proposals.length ? proposals[proposalIndex + 1] : undefined
  const prevProposalId = proposalIndex - 1 >= 0 ? proposals[proposalIndex - 1] : undefined

  return {
    nextProposalId,
    prevProposalId,
  }
}

export default inject(mapStore)(Ratings)
