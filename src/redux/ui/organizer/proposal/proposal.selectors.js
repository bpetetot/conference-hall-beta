export const getProposal = state => state.ui.organizer.proposal

export const getCurrentProposalIndex = state => getProposal(state).currentProposalIndex

export const hasNext = (store) => {
  const proposals = store.data.proposals.getKeys()
  const currentIndex = getCurrentProposalIndex(store.getState())
  return currentIndex + 1 < proposals.length
}

export const hasPrevious = (state) => {
  const currentIndex = getCurrentProposalIndex(state)
  return currentIndex - 1 >= 0
}
