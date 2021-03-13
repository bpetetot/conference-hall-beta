import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

async function fetchReviewerMessages(eventId, proposalId) {
  const messages = await fetchData({
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}/messages`,
    auth: true,
  })
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
  return fetchData({
    method: 'POST',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}/messages`,
    auth: true,
    body: { message },
  })
}

async function updateReviewerMessage(eventId, proposalId, messageId, message) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}/messages/${messageId}`,
    auth: true,
    body: { message },
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
  return fetchData({
    method: 'DELETE',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}/messages/${messageId}`,
    auth: true,
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
