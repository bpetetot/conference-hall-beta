import { useSelection } from 'features/proposal/list/selection-context'
import firebase from 'firebase/app'
import { downloadFile } from 'helpers/dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation } from 'react-router'

async function fetchSpeakerProposals(eventId) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`/api/speaker/events/${eventId}/proposals`, auth)
  return response.json()
}

export function useSpeakerProposals(eventId) {
  return useQuery('speaker-proposals', () => fetchSpeakerProposals(eventId), {
    initialData: {},
  })
}

function removeEmpty(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)))
}

async function fetchOrganizerProposals(eventId, filters) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const params = new URLSearchParams(removeEmpty(filters))
  const response = await fetch(`/api/organizer/events/${eventId}/proposals?${params}`, auth)
  return response.json()
}

export function useOrganizerProposals(eventId) {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = {
    search: params.get('search'),
    status: params.get('status'),
    ratings: params.get('ratings'),
    format: params.get('format'),
    category: params.get('category'),
    sort: params.get('sort'),
    page: params.get('page'),
    pageSize: params.get('pageSize'),
  }
  return useQuery(
    ['proposals/search', eventId, filters],
    () => fetchOrganizerProposals(eventId, filters),
    {
      enabled: !!eventId,
      initialData: { total: 0, proposals: [] },
    },
  )
}

export function useOrganizerProposal(eventId, proposalIndex) {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = {
    search: params.get('search'),
    status: params.get('status'),
    ratings: params.get('ratings'),
    format: params.get('format'),
    category: params.get('category'),
    sort: params.get('sort'),
    page: proposalIndex,
    pageSize: 1,
  }
  return useQuery(
    ['proposal', eventId, filters],
    async () => {
      const { proposals, ...result } = await fetchOrganizerProposals(eventId, filters)
      return {
        proposal: proposals?.[0],
        nextProposal: result.nextPage,
        previousProposal: result.previousPage,
      }
    },
    { enabled: !!eventId && !!proposalIndex },
  )
}

async function updateProposal(eventId, proposalId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals/${proposalId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({
      title: data.title,
      abstract: data.abstract,
      level: data.level,
      language: data.language,
      formats: [parseInt(data.format, 10)],
      categories: [parseInt(data.category, 10)],
    }),
  })
}

export function useUpdateProposal(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateProposal(eventId, proposalId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('proposal')
    },
  })
}

async function rateProposal(eventId, proposalId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals/${proposalId}/rate`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      rating: data.rating,
      feeling: data.feeling,
    }),
  })
}

export function useRateProposal(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation((data) => rateProposal(eventId, proposalId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('proposal')
    },
  })
}

async function exportProposals(eventId, filters) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch(`/api/organizer/events/${eventId}/proposals/export`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(filters),
  })
  const blob = await response.blob()
  const filename = `export-${Date.now()}.json`
  downloadFile(filename, blob)
}

export function useExportProposals(eventId) {
  const { exceptItems, selectedItems } = useSelection()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = removeEmpty({
    search: params.get('search'),
    status: params.get('status'),
    ratings: params.get('ratings'),
    format: params.get('format'),
    category: params.get('category'),
    exceptItems,
    selectedItems,
  })

  return useMutation(() => exportProposals(eventId, filters))
}

async function bulkProposalsStatus(eventId, filters, status) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/events/${eventId}/proposals`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ filters, data: { status } }),
  })
}

export function useBulkProposalsStatus(eventId) {
  const queryClient = useQueryClient()
  const { exceptItems, selectedItems } = useSelection()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = removeEmpty({
    search: params.get('search'),
    status: params.get('status'),
    ratings: params.get('ratings'),
    format: params.get('format'),
    category: params.get('category'),
    exceptItems,
    selectedItems,
  })
  return useMutation((status) => bulkProposalsStatus(eventId, filters, status), {
    onSuccess: () => {
      queryClient.invalidateQueries('proposals/search')
    },
  })
}
