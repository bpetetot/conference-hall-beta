export const loadMessages = async (action, store) => {
  const { eventId, proposalId } = action.payload
  store.ui.organizer.organizersThread.reset()
  // TODO fetch data
  // TODO get user info
  console.log('ON_LOAD_PROPOSAL_ORGANIZERS_MESSAGES', { eventId, proposalId })
}

export const addMessage = async (action, store) => {
  const {
    eventId, proposalId, uid, message,
  } = action.payload
  const user = store.data.users.get(uid)
  const messages = store.ui.organizer.organizersThread.get() || []
  const newMessage = {
    id: Date.now(),
    name: user.displayName,
    content: message,
    date: new Date(),
    img: user.photoURL,
  }
  store.ui.organizer.organizersThread.set([...messages, newMessage])

  // TODO save message
  // { uid, message, date: new Date() }

  console.log('ON_ADD_PROPOSAL_ORGANIZERS_MESSAGE', {
    eventId, proposalId, uid, message,
  })
}
