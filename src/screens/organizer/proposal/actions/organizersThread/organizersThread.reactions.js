import userCrud from 'firebase/user'
import { toDate } from 'helpers/firebase'
import { fetchOrganizersThread, addOrganizersThreadMessage, updateOrganizersThreadMessage } from 'firebase/proposals'

export const loadMessages = async (action, store) => {
  const { eventId, proposalId } = action.payload
  store.ui.organizer.organizersThread.reset()
  const result = await fetchOrganizersThread(eventId, proposalId)
  const messages = await Promise.all(
    result.map(async ({
      uid, date, messageId, message, modified,
    }) => {
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

export const saveMessage = (action, store) => {
  const {
    eventId, proposalId, uid, message, messageId,
  } = action.payload
  if (messageId) {
    updateOrganizersThreadMessage(eventId, proposalId, messageId, message)
    store.ui.organizer.organizersThread.update({
      id: messageId,
      message,
      editable: false,
      modified: true,
    })
  } else {
    const user = store.data.users.get(uid)

    const newMessage = {
      message,
      date: new Date(),
      name: user.displayName,
      img: user.photoURL,
    }
    store.ui.organizer.organizersThread.add(newMessage)

    addOrganizersThreadMessage(eventId, proposalId, uid, message)
  }
}

export const editMessage = (action, store) => {
  const { messageId } = action.payload
  const message = store.ui.organizer.organizersThread.get(messageId)
  store.ui.organizer.organizersThread.update({ id: messageId, editable: !message.editable })
}
