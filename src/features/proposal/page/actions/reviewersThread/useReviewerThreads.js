import { useState, useEffect } from 'react'

import { toDate } from 'helpers/firebase'
import {
  queryReviewersThread,
  addReviewersThreadMessage,
  updateReviewersThreadMessage,
  deleteReviewersThreadMessage,
} from '../../../../../firebase/proposals'

export default ({ eventId, proposalId, user }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const query = queryReviewersThread(eventId, proposalId)
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
      await updateReviewersThreadMessage(eventId, proposalId, messageId, message)
    } else {
      await addReviewersThreadMessage(eventId, proposalId, message, user)
    }
  }

  const deleteMessage = (messageId) => {
    deleteReviewersThreadMessage(eventId, proposalId, messageId)
  }

  return { messages, saveMessage, deleteMessage }
}
