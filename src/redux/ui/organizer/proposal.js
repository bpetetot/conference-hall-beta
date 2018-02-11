const initialState = {
  currentProposalIndex: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PROPOSAL_INDEX':
      return { currentProposalIndex: action.payload.proposalIndex }
    default:
      return state
  }
}
