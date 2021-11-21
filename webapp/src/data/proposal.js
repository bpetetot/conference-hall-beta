import { useSelection } from 'features/proposal/list/selection-context'
import { downloadFile } from 'helpers/dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useLocation } from 'react-router'
import { fetchBlob, fetchData } from './fetch'

const parseProposalResponse = (raw) => ({
  ...raw,
  createdAt: new Date(raw.createdAt),
})

async function fetchSpeakerProposals({ queryKey }) {
  const [_key, eventId] = queryKey // eslint-disable-line no-unused-vars
  const proposals = await fetchData({
    method: 'GET',
    url: `/api/speaker/events/${eventId}/proposals`,
    auth: true,
  })
  return proposals.map(parseProposalResponse)
}

export function useSpeakerProposals(eventId) {
  return useQuery(['speaker/proposals', eventId], fetchSpeakerProposals)
}

function removeEmpty(obj) {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)))
}

async function fetchOrganizerProposals(eventId, filters) {
  const params = new URLSearchParams(removeEmpty(filters))
  const result = await fetchData({
    method: 'GET',
    url: `/api/organizer/events/${eventId}/proposals?${params}`,
    auth: true,
  })
  return { ...result, proposals: result.proposals.map(parseProposalResponse) }
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

async function fetchOrganizerProposalsIds(eventId, filters) {
  const params = new URLSearchParams(removeEmpty(filters))
  return fetchData({
    method: 'GET',
    url: `/api/organizer/events/${eventId}/proposals/ids?${params}`,
    auth: true,
  })
}

export function useOrganizerProposalsIds(eventId) {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const filters = {
    search: params.get('search'),
    status: params.get('status'),
    ratings: params.get('ratings'),
    format: params.get('format'),
    category: params.get('category'),
    sort: params.get('sort'),
  }
  return useQuery(
    ['proposals/ids', eventId, filters],
    () => fetchOrganizerProposalsIds(eventId, filters),
    { enabled: !!eventId },
  )
}

async function fetchOrganizerProposal(eventId, proposalId) {
  const proposal = await fetchData({
    method: 'GET',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}`,
    auth: true,
  })
  return parseProposalResponse(proposal)
}

export function useOrganizerProposal(eventId, proposalId) {
  return useQuery(
    ['proposal', eventId, String(proposalId)],
    () => fetchOrganizerProposal(eventId, proposalId),
    { enabled: !!eventId && !!proposalId },
  )
}

async function updateProposal(eventId, proposalId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}`,
    auth: true,
    body: {
      title: data.title,
      abstract: data.abstract,
      level: data.level,
      languages: data.language ? [data.language] : undefined,
      formats: data.format ? [parseInt(data.format, 10)] : null,
      categories: data.category ? [parseInt(data.category, 10)] : null,
    },
  })
}

export function useUpdateProposal(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateProposal(eventId, proposalId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['proposal', eventId, String(proposalId)])
    },
  })
}

async function rateProposal(eventId, proposalId, data) {
  return fetchData({
    method: 'PUT',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}/rate`,
    auth: true,
    body: {
      rating: data.rating,
      feeling: data.feeling,
    },
  })
}

export function useRateProposal(eventId, proposalId) {
  const queryClient = useQueryClient()
  return useMutation((data) => rateProposal(eventId, proposalId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['proposal', eventId, String(proposalId)])
    },
  })
}

async function exportProposals(eventId, format, filters) {
  const blob = await fetchBlob({
    method: 'PUT',
    url: `/api/organizer/events/${eventId}/proposals/export?format=${format}`,
    auth: true,
    body: filters,
  })
  downloadFile(`export-${Date.now()}.${format}`, blob)
}

export function useExportProposals(eventId, format) {
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
  return useMutation(() => exportProposals(eventId, format, filters))
}

async function sendProposalsEmails(eventId, filters) {
  return fetchBlob({
    method: 'PUT',
    url: `/api/organizer/events/${eventId}/proposals/sendEmails`,
    auth: true,
    body: filters,
  })
}

export function useSendProposalsEmails(eventId) {
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
  return useMutation(() => sendProposalsEmails(eventId, filters), {
    onSuccess: () => {
      queryClient.invalidateQueries('proposals/search')
    },
  })
}

async function bulkProposalsStatus(eventId, filters, status) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/proposals`,
    auth: true,
    body: { filters, data: { status } },
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
