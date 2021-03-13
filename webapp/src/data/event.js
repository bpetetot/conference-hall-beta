import { useNotification } from 'app/layout/notification/context'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

const parseEventResponse = (event) => ({
  ...event,
  cfpStart: event.cfpStart && new Date(event.cfpStart),
  cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
  conferenceStart: event.conferenceStart && new Date(event.conferenceStart),
  conferenceEnd: event.conferenceEnd && new Date(event.conferenceEnd),
})

const parseOrganizerEventResponse = (event) => ({
  ...event,
  conferenceStart: event.conferenceStart && new Date(event.conferenceStart),
  conferenceEnd: event.conferenceEnd && new Date(event.conferenceEnd),
  cfpStart: event.cfpStart && new Date(event.cfpStart),
  cfpEnd: event.cfpEnd && new Date(event.cfpEnd),
  updatedAt: new Date(event.updatedAt),
  createdAt: new Date(event.createdAt),
  archived: Boolean(event.archived),
})

async function fetchEvent({ queryKey }) {
  const [_key, eventId] = queryKey // eslint-disable-line no-unused-vars
  const event = await fetchData({ url: `/api/events/${eventId}` })
  return parseEventResponse(event)
}

export function useEvent(eventId) {
  return useQuery(['events', eventId], fetchEvent, { enabled: !!eventId })
}

async function fetchSearchEvents() {
  const events = await fetchData({ url: `/api/speaker/events`, auth: true })
  return events.map(parseEventResponse)
}

export function useSearchEvents() {
  return useQuery('events', fetchSearchEvents)
}

async function fetchOrganizerEvent({ queryKey }) {
  const [_key, eventId] = queryKey // eslint-disable-line no-unused-vars
  const event = await fetchData({ url: `/api/organizer/events/${eventId}`, auth: true })
  return parseOrganizerEventResponse(event)
}

export function useOrganizerEvent(eventId) {
  return useQuery(['organizer/events', eventId], fetchOrganizerEvent, {
    enabled: !!eventId,
  })
}

async function fetchOrganizerEvents({ queryKey }) {
  const [_key, status] = queryKey // eslint-disable-line no-unused-vars
  const events = await fetchData({ url: '/api/organizer/events', auth: true })
  return events.map(parseOrganizerEventResponse).filter((event) => {
    if (status === 'all') return true
    if (status === 'archived') return event.archived === true
    return event.archived !== true
  })
}

export function useOrganizerEvents(status) {
  return useQuery(['organizer/events', status], fetchOrganizerEvents)
}

async function createEvent(data) {
  return fetchData({
    method: 'POST',
    url: '/api/organizer/events',
    auth: true,
    body: {
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
    },
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation((data) => createEvent(data), {
    onSuccess: () => queryClient.invalidateQueries('organizer/events'),
  })
}

async function updateEvent(eventId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}`,
    auth: true,
    body: data,
  })
}

function useUpdateEvent(eventId, onUpdate, onError) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateEvent(eventId, onUpdate(data)), {
    onSuccess: () => queryClient.invalidateQueries('organizer/events'),
    onError,
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
  const { sendError } = useNotification()
  const onUpdate = (value) => ({ [field]: value })
  return useUpdateEvent(eventId, onUpdate, (error) => {
    sendError(`An unexpected error has occurred: ${error.message}`)
  })
}

async function addFormat(eventId, data) {
  return fetchData({
    method: 'POST',
    url: `/api/organizer/events/${eventId}/formats`,
    auth: true,
    body: data,
  })
}

export function useAddFormat(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => addFormat(eventId, data), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function updateFormat(eventId, formatId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/formats/${formatId}`,
    auth: true,
    body: {
      name: data.name,
      description: data.description,
    },
  })
}

export function useUpdateFormat(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => updateFormat(eventId, data.id, data), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function deleteFormat(eventId, formatId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/organizer/events/${eventId}/formats/${formatId}`,
    auth: true,
  })
}

export function useDeleteFormat(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => deleteFormat(eventId, data.id), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function addCategory(eventId, data) {
  return fetchData({
    method: 'POST',
    url: `/api/organizer/events/${eventId}/categories`,
    auth: true,
    body: data,
  })
}

export function useAddCategory(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => addCategory(eventId, data), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function updateCategory(eventId, categoryId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/categories/${categoryId}`,
    auth: true,
    body: {
      name: data.name,
      description: data.description,
    },
  })
}

export function useUpdateCategory(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => updateCategory(eventId, data.id, data), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function deleteCategory(eventId, categoryId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/organizer/events/${eventId}/categories/${categoryId}`,
    auth: true,
  })
}

export function useDeleteCategory(eventId) {
  const { sendError } = useNotification()
  const queryClient = useQueryClient()
  return useMutation((data) => deleteCategory(eventId, data.id), {
    onSuccess: () => queryClient.invalidateQueries(['organizer/events', eventId]),
    onError: (e) => sendError(`An unexpected error has occurred: ${e.message}`),
  })
}

async function fetchSpeakerSurvey({ queryKey }) {
  const [_key, eventId, speakerId] = queryKey // eslint-disable-line no-unused-vars
  const survey = await fetchData({
    url: `/api/organizer/events/${eventId}/speakers/${speakerId}/survey`,
    auth: true,
  })
  return survey?.answers
}

export function useSpeakerSurvey(eventId, speakerId) {
  return useQuery(['organizer/speaker/survey', eventId, speakerId], fetchSpeakerSurvey, {
    enabled: !!eventId && !!speakerId,
  })
}
