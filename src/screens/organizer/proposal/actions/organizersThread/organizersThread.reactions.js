export const loadMessages = async (action) => {
  const { eventId, proposalId } = action.payload
  console.log('ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES', { eventId, proposalId })
}

export const addMessage = async (action) => {
  const {
    eventId, proposalId, uid, message,
  } = action.payload
  console.log('ON_ADD_PROPOSAL_ORGANIZERS_MESSAGE', {
    eventId, proposalId, uid, message,
  })
}
