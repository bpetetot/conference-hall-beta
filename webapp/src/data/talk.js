import { useMutation, useQuery, useQueryClient } from 'react-query'
import pick from 'lodash/pick'
import { fetchData } from './fetch'

const parseTalkResponse = (raw) => ({
  ...raw,
  updatedAt: new Date(raw.updatedAt),
  createdAt: new Date(raw.createdAt),
})

async function fetchTalks(status) {
  const talks = await fetchData({ url: '/api/speaker/talks', auth: true })
  return talks.map(parseTalkResponse).filter((talk) => {
    if (status === 'all') return true
    if (status === 'archived') return talk.archived === true
    return talk.archived !== true
  })
}

export function useTalks(status) {
  return useQuery(['talks', status], () => fetchTalks(status))
}

async function fetchTalk({ queryKey }) {
  const [_key, talkId] = queryKey // eslint-disable-line no-unused-vars
  const talk = await fetchData({ url: `/api/speaker/talks/${talkId}`, auth: true })
  return parseTalkResponse(talk)
}

export function useTalk(talkId) {
  return useQuery(['talk', String(talkId)], fetchTalk, { enabled: !!talkId })
}

async function createTalk(data) {
  return fetchData({
    method: 'POST',
    url: '/api/speaker/talks',
    auth: true,
    body: pick(data, ['title', 'abstract', 'level', 'language', 'references']),
  })
}

export function useCreateTalk() {
  return useMutation(createTalk)
}

async function updateTalk(talkId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/speaker/talks/${talkId}`,
    auth: true,
    body: pick(data, ['title', 'abstract', 'level', 'language', 'references', 'archived']),
  })
}

export function useUpdateTalk(talkId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateTalk(talkId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function deleteTalk(talkId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/speaker/talks/${talkId}`,
    auth: true,
  })
}

export function useDeleteTalk() {
  const queryClient = useQueryClient()
  return useMutation(deleteTalk, {
    onSuccess: () => {
      queryClient.invalidateQueries('talks')
    },
  })
}

async function addSpeaker(talkId, speakerId) {
  return fetchData({
    method: 'POST',
    url: `/api/speaker/talks/${talkId}/speakers/${speakerId}`,
    auth: true,
  })
}

export function useAddSpeaker(talkId) {
  const queryClient = useQueryClient()
  return useMutation((speakerId) => addSpeaker(talkId, speakerId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function removeSpeaker(talkId, speakerId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/speaker/talks/${talkId}/speakers/${speakerId}`,
    auth: true,
  })
}

export function useRemoveSpeaker(talkId, speakerId) {
  const queryClient = useQueryClient()
  return useMutation(() => removeSpeaker(talkId, speakerId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}

async function submitTalk(eventId, talkId, data) {
  const formats = parseInt(data.formats, 10)
  const categories = parseInt(data.categories, 10)
  return fetchData({
    method: 'PUT',
    url: `/api/speaker/talks/${talkId}/submit/${eventId}`,
    auth: true,
    body: {
      comments: data.comments,
      formats: formats ? [formats] : [],
      categories: categories ? [categories] : [],
    },
  })
}

export function useSubmitTalk(eventId, talkId) {
  return useMutation((data) => submitTalk(eventId, talkId, data))
}

async function unsubmitTalk(eventId, talkId) {
  return fetchData({
    method: 'PUT',
    url: `/api/speaker/talks/${talkId}/unsubmit/${eventId}`,
    auth: true,
  })
}

export function useUnsubmitTalk(eventId, talkId) {
  return useMutation(() => unsubmitTalk(eventId, talkId))
}

async function confirmTalk(eventId, talkId, confirmed) {
  return fetchData({
    method: 'PUT',
    url: `/api/speaker/talks/${talkId}/confirm/${eventId}`,
    auth: true,
    body: { confirmed },
  })
}

export function useConfirmTalk(eventId, talkId) {
  const queryClient = useQueryClient()
  return useMutation((confirmed) => confirmTalk(eventId, talkId, confirmed), {
    onSuccess: () => {
      queryClient.invalidateQueries(['talk', String(talkId)])
    },
  })
}
