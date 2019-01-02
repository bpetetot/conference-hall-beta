import userCrud from 'firebase/user'
import { toDate } from 'helpers/firebase'
import { fetchOrganizersThread, addOrganizersThreadMessage } from 'firebase/proposals'

export const loadMessages = async (action, store) => {
  const { eventId, proposalId } = action.payload
  store.ui.organizer.organizersThread.reset()
  const result = await fetchOrganizersThread(eventId, proposalId)

  const messages = await Promise.all(
    result.map(async ({ uid, date, message }) => {
      let user = store.data.users.get(uid)
      if (!user) {
        const ref = await userCrud.read(uid)
        user = ref.data()
        store.data.users.add(user)
      }
      return {
        message,
        date: toDate(date),
        name: user.displayName,
        img: user.photoURL,
      }
    }),
  )

  store.ui.organizer.organizersThread.set(messages)
}

export const addMessage = (action, store) => {
  const {
    eventId, proposalId, uid, message,
  } = action.payload
  const user = store.data.users.get(uid)
  const messages = store.ui.organizer.organizersThread.get() || []

  const newMessage = {
    message,
    date: new Date(),
    name: user.displayName,
    img: user.photoURL,
  }
  store.ui.organizer.organizersThread.set([...messages, newMessage])

  addOrganizersThreadMessage(eventId, proposalId, uid, message)
}
