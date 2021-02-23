import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'

async function fetchEvent(eventId) {
  const response = await fetch(`http://localhost:3001/events/${eventId}`)
  const event = await response.json()
  return {
    ...event,
    cfpStart: event.cfpStart && new Date(event.cfpStart),
    cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
    conferenceStart: event.conferenceStart && new Date(event.conferenceStart),
    conferenceEnd: event.conferenceEnd && new Date(event.conferenceEnd),
  }
}

export function useEvent(eventId) {
  return useQuery(['events', eventId], () => fetchEvent(eventId), {
    enabled: !!eventId,
  })
}

async function fetchSearchEvents() {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`http://localhost:3001/speaker/events`, auth)
  const events = await response.json()
  return events.map((event) => ({
    ...event,
    cfpStart: event.cfpStart && new Date(event.cfpStart),
    cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
    conferenceStart: event.conferenceStart && new Date(event.conferenceStart),
    conferenceEnd: event.conferenceEnd && new Date(event.conferenceEnd),
  }))
}

export function useSearchEvents() {
  return useQuery('events', () => fetchSearchEvents(), {
    initialData: [],
  })
}

async function fetchOrganizerEvent(eventId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`http://localhost:3001/organizer/events/${eventId}`, auth)
  const event = await response.json()
  return {
    ...event,
    conferenceStart: event.conferenceStart && new Date(event.conferenceStart),
    conferenceEnd: event.conferenceEnd && new Date(event.conferenceEnd),
    cfpStart: event.cfpStart && new Date(event.cfpStart),
    cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
    updatedAt: new Date(event.updatedAt),
    createdAt: new Date(event.createdAt),
  }
}

export function useOrganizerEvent(eventId) {
  return useQuery(['organizer/events', String(eventId)], () => fetchOrganizerEvent(eventId), {
    enabled: !!eventId,
  })
}

async function fetchOrganizerEvents() {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch('http://localhost:3001/organizer/events', auth)
  const events = await response.json()
  return events.map((event) => ({
    ...event,
    conferenceStart: new Date(event.conferenceStart),
    conferenceEnd: new Date(event.conferenceEnd),
    cfpStart: event.cfpStart && new Date(event.cfpStart),
    cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
    updatedAt: new Date(event.updatedAt),
    createdAt: new Date(event.createdAt),
  }))
}

export function useOrganizerEvents() {
  return useQuery('organizer/events', () => fetchOrganizerEvents(), {
    initialData: [],
  })
}

async function createEvent(data) {
  const token = await firebase.auth().currentUser.getIdToken()
  const event = {
    type: data.type,
    name: data.name,
    description: data.description,
    visibility: data.visibility,
    conferenceStart: data.conferenceDates?.start,
    conferenceEnd: data.conferenceDates?.end,
    address: data.address?.address,
    lat: data.address?.lat,
    lng: data.address?.lng,
    timezone: data.address?.timezone,
    website: data.website,
    contact: data.contact,
    organizationId: data.organizationId,
  }
  const response = await fetch('http://localhost:3001/organizer/events', {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(event),
  })
  return response.json()
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation((data) => createEvent(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('organizer/events')
    },
  })
}

async function updateEvent(eventId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function useUpdateEvent(eventId, onUpdate) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateEvent(eventId, onUpdate(data)), {
    onSuccess: () => {
      queryClient.invalidateQueries('organizer/events')
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

export function useUpdateInfoEvent(eventId) {
  const onUpdate = (data) => ({
    name: data.name,
    description: data.description,
    visibility: data.visibility,
    conferenceStart: data.conferenceDates?.start,
    conferenceEnd: data.conferenceDates?.end,
    address: data.address?.address,
    lat: data.address?.lat,
    lng: data.address?.lng,
    timezone: data.address?.timezone,
    website: data.website,
    contact: data.contact,
    organizationId: data.organizationId,
  })
  return useUpdateEvent(eventId, onUpdate)
}

export function useUpdateCfpEvent(eventId) {
  const onUpdate = (data) => ({
    cfpStart: data.cfpDates?.start,
    cfpEnd: data.cfpDates?.end,
    maxProposals: data.maxProposals,
    formatsRequired: data.formatsRequired,
    categoriesRequired: data.categoriesRequired,
  })
  return useUpdateEvent(eventId, onUpdate)
}

export function useUpdateEventField(eventId, field) {
  const onUpdate = (value) => ({ [field]: value })
  return useUpdateEvent(eventId, onUpdate)
}

async function addFormat(eventId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/formats`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function useAddFormat(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => addFormat(eventId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function updateFormat(eventId, formatId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/formats/${formatId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      description: data.description,
    }),
  })
}

export function useUpdateFormat(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateFormat(eventId, data.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function deleteFormat(eventId, formatId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/formats/${formatId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}

export function useDeleteFormat(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => deleteFormat(eventId, data.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function addCategory(eventId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/categories`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function useAddCategory(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => addCategory(eventId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function updateCategory(eventId, categoryId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/categories/${categoryId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      description: data.description,
    }),
  })
}

export function useUpdateCategory(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateCategory(eventId, data.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function deleteCategory(eventId, categoryId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`http://localhost:3001/organizer/events/${eventId}/categories/${categoryId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  })
}

export function useDeleteCategory(eventId) {
  const queryClient = useQueryClient()
  return useMutation((data) => deleteCategory(eventId, data.id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organizer/events', String(eventId)])
    },
  })
}

async function fetchSpeakerSurvey(eventId, speakerId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(
    `http://localhost:3001/organizer/events/${eventId}/speakers/${speakerId}/survey`,
    auth,
  )
  const survey = await response.json()
  return survey?.answers
}

export function useSpeakerSurvey(eventId, speakerId) {
  return useQuery(
    ['organizer/speaker/survey', String(eventId), String(speakerId)],
    () => fetchSpeakerSurvey(eventId, speakerId),
    {
      enabled: !!eventId && !!speakerId,
    },
  )
}
