import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'

async function fetchSurvey(eventId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`http://localhost:3001/speaker/events/${eventId}/survey`, auth)
  return response.json()
}

export function useSurvey(eventId) {
  return useQuery(['survey', String(eventId)], () => fetchSurvey(eventId), {
    enabled: !!eventId,
  })
}

async function saveSurvey(eventId, answers) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch(`http://localhost:3001/speaker/events/${eventId}/survey`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ answers }),
  })
  return response.json()
}

export function useSaveSurvey(eventId) {
  const queryClient = useQueryClient()
  return useMutation((answers) => saveSurvey(eventId, answers), {
    onSuccess: () => {
      queryClient.invalidateQueries(['survey', String(eventId)])
    },
  })
}
