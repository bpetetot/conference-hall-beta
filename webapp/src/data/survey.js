import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

async function fetchSurvey({ queryKey }) {
  const [_key, eventId] = queryKey // eslint-disable-line no-unused-vars
  return fetchData({
    url: `/api/speaker/events/${eventId}/survey`,
    auth: true,
  })
}

export function useSurvey(eventId) {
  return useQuery(['survey', String(eventId)], fetchSurvey, { enabled: !!eventId })
}

async function saveSurvey(eventId, answers) {
  return fetchData({
    method: 'POST',
    url: `/api/speaker/events/${eventId}/survey`,
    auth: true,
    body: { answers },
  })
}

export function useSaveSurvey(eventId) {
  const queryClient = useQueryClient()
  return useMutation((answers) => saveSurvey(eventId, answers), {
    onSuccess: () => {
      queryClient.invalidateQueries(['survey', String(eventId)])
    },
  })
}
