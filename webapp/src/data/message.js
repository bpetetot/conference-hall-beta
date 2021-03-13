import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'

async function fetchReviewerMessages(eventId, proposalId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(
    `/api/organizer/events/${eventId}/proposals/${proposalId}/messages`,
    auth,
  )
  const messages = await response.json()
  return messages.map((message) => ({
    ...message,
    createdAt: new Date(message.createdAt),
    updatedAt: new Date(message.updatedAt),
  }))
}

export function useReviewerMessages(eventId, proposalId) {
  return useQuery(
    ['proposals-messages', eventId, proposalId],
    () => fetchReviewerMessages(eventId, proposalId),
    {
      initialData: [],
    },
  )
}

async function addReviewerMessage(eventId, proposalId, message) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals/${proposalId}/messages`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}

async function updateReviewerMessage(eventId, proposalId, messageId, message) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals/${proposalId}/messages/${messageId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ message }),
  })
}

export function useSaveReviewerMessage(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation(
    ({ message, id }) => {
      if (id) {
        return updateReviewerMessage(eventId, proposalId, id, message)
      }
      return addReviewerMessage(eventId, proposalId, message)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['proposals-messages', eventId, proposalId])
      },
    },
  )
}

async function deleteReviewerMessage(eventId, proposalId, messageId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals/${proposalId}/messages/${messageId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}

export function useDeleteReviewerMessage(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation((messageId) => deleteReviewerMessage(eventId, proposalId, messageId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['proposals-messages', eventId, proposalId])
    },
  })
}
