import { useState, useEffect } from 'react'

import { toDate } from 'helpers/firebase'
import {
  queryOrganizersThread,
  addOrganizersThreadMessage,
  updateOrganizersThreadMessage,
  deleteOrganizersThreadMessage,
} from 'firebase/proposals'

export default ({ eventId, proposalId, user }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const query = queryOrganizersThread(eventId, proposalId)
    const unsubscribe = query.onSnapshot((snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const { message, modified, uid, date, displayName, photoURL } = doc.data()
        return {
          id: doc.id,
          message,
          modified,
          date: toDate(date || new Date()),
          owner: uid,
          displayName,
          photoURL,
        }
      })
      setMessages(newMessages)
    })

    return unsubscribe
  }, [eventId, proposalId])

  const saveMessage = async (message, messageId) => {
    if (messageId) {
      await updateOrganizersThreadMessage(eventId, proposalId, messageId, message)
    } else {
      await addOrganizersThreadMessage(eventId, proposalId, message, user)
    }
  }

  const deleteMessage = (messageId) => {
    deleteOrganizersThreadMessage(eventId, proposalId, messageId)
  }

  return { messages, saveMessage, deleteMessage }
}
