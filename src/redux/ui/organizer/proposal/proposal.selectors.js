import proposalsData from 'redux/data/proposals'

export const getProposal = state => state.ui.organizer.proposal

export const getCurrentProposalIndex = state => getProposal(state).currentProposalIndex

export const hasNext = (state) => {
  const proposals = proposalsData.getKeys(state)
  const currentIndex = getCurrentProposalIndex(state)
  return currentIndex + 1 < proposals.length
}

export const hasPrevious = (state) => {
  const currentIndex = getCurrentProposalIndex(state)
  return currentIndex - 1 >= 0
}
