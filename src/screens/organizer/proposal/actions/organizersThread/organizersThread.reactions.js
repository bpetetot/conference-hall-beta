import userCrud from 'firebase/user'
import { toDate } from 'helpers/firebase'
import {
  fetchOrganizersThread,
  addOrganizersThreadMessage,
  updateOrganizersThreadMessage,
  deleteOrganizersThreadMessage,
} from 'firebase/proposals'

export const loadMessages = async (action, store) => {
  const { eventId, proposalId } = action.payload
  store.ui.organizer.organizersThread.reset()
  const result = await fetchOrganizersThread(eventId, proposalId)
  const messages = await Promise.all(
    result.map(async ({ uid, date, messageId, message, modified }) => {
      let user = store.data.users.get(uid)
      if (!user) {
        const ref = await userCrud.read(uid)
        user = ref.data()
        store.data.users.add(user)
      }
      return {
        id: messageId,
        message,
        modified,
        owner: uid,
        date: toDate(date),
        name: user.displayName,
        img: user.photoURL,
      }
    }),
  )
  store.ui.organizer.organizersThread.set(messages)
}

export const saveMessage = async (action, store) => {
  const { eventId, proposalId, uid, message, messageId } = action.payload
  if (messageId) {
    updateOrganizersThreadMessage(eventId, proposalId, messageId, message)
    store.ui.organizer.organizersThread.update({
      id: messageId,
      message,
      modified: true,
    })
  } else {
    const user = store.data.users.get(uid)

    const { id } = await addOrganizersThreadMessage(eventId, proposalId, uid, message)

    const newMessage = {
      id,
      message,
      owner: uid,
      date: new Date(),
      name: user.displayName,
      img: user.photoURL,
    }

    store.ui.organizer.organizersThread.add(newMessage)
  }
}

export const deleteMessage = (action, store) => {
  const { eventId, proposalId, messageId } = action.payload
  deleteOrganizersThreadMessage(eventId, proposalId, messageId)
  store.ui.organizer.organizersThread.remove(messageId)
}
