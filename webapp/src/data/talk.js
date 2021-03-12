import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import pick from 'lodash/pick'

async function fetchUserTalks() {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch('http://localhost:3001/speaker/talks', auth)
  const talks = await response.json()
  return talks.map((talk) => ({
    ...talk,
    id: parseInt(talk.id, 10),
    archived: Boolean(talk.archived),
    updatedAt: new Date(talk.updatedAt),
    createdAt: new Date(talk.createdAt),
  }))
}

export function useTalks() {
  return useQuery('talks', () => fetchUserTalks(), {
    initialData: [],
  })
}

async function fetchTalk(talkId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`http://localhost:3001/speaker/talks/${talkId}`, auth)
  const talk = await response.json()
  return {
    ...talk,
    id: parseInt(talk.id, 10),
    archived: Boolean(talk.archived),
    updatedAt: new Date(talk.updatedAt),
    createdAt: new Date(talk.createdAt),
  }
}

export function useTalk(talkId) {
  return useQuery(['talk', String(talkId)], () => fetchTalk(talkId), {
    enabled: !!talkId,
  })
}

async function createTalk(data) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch('http://localhost:3001/speaker/talks', {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(pick(data, ['title', 'abstract', 'level', 'language', 'references'])),
  })
  return response.json()
}

export function useCreateTalk() {
  const queryClient = useQueryClient()
  return useMutation((data) => createTalk(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
    },
  })
}

async function updateTalk(talkId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/speaker/talks/${talkId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(
      pick(data, ['title', 'abstract', 'level', 'language', 'references', 'archived']),
    ),
  })
}

export function useUpdateTalk(talkId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateTalk(talkId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function deleteTalk(talkId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/speaker/talks/${talkId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}

export function useDeleteTalk() {
  const queryClient = useQueryClient()
  return useMutation((talkId) => deleteTalk(talkId), {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
    },
  })
}

async function addSpeaker(talkId, speakerId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/speaker/talks/${talkId}/speakers/${speakerId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}

export function useAddSpeaker(talkId) {
  const queryClient = useQueryClient()
  return useMutation((speakerId) => addSpeaker(talkId, speakerId), {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function removeSpeaker(talkId, speakerId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/speaker/talks/${talkId}/speakers/${speakerId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}

export function useRemoveSpeaker(talkId, speakerId) {
  const queryClient = useQueryClient()
  return useMutation(() => removeSpeaker(talkId, speakerId), {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function submitTalk(eventId, talkId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch(`http://localhost:3001/speaker/talks/${talkId}/submit/${eventId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      comments: data.comments,
      formats: [parseInt(data.formats, 10)],
      categories: [parseInt(data.categories, 10)],
    }),
  })
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message)
  }
}

export function useSubmitTalk(eventId, talkId) {
  const queryClient = useQueryClient()
  return useMutation((data) => submitTalk(eventId, talkId, data), {
    throwOnError: false,
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function unsubmitTalk(eventId, talkId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch(
    `http://localhost:3001/speaker/talks/${talkId}/unsubmit/${eventId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    },
  )
  if (!response.ok) {
    const body = await response.json()
    throw new Error(body?.message)
  }
}

export function useUnsubmitTalk(eventId, talkId) {
  const queryClient = useQueryClient()
  return useMutation(() => unsubmitTalk(eventId, talkId), {
    useErrorBoundary: false,
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}
