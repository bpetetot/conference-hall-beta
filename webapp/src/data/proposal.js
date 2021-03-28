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
  const format = parseInt(data.format, 10)
  const category = parseInt(data.category, 10)
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/events/${eventId}/proposals/${proposalId}`,
    auth: true,
    body: {
      title: data.title,
      abstract: data.abstract,
      level: data.level,
      language: data.language,
      formats: [format],
      categories: [category],
    },
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
      queryClient.invalidateQueries('proposal')
    },
  })
}

async function exportProposals(eventId, filters) {
  const blob = await fetchBlob({
    method: 'PUT',
    url: `/api/organizer/events/${eventId}/proposals/export`,
    auth: true,
    body: filters,
  })
  downloadFile(`export-${Date.now()}.json`, blob)
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

async function sendProposalsEmails(eventId, filters) {
  return fetchBlob({
    method: 'PUT',
    url: `/api/organizer/events/${eventId}/proposals/sendEmails`,
    auth: true,
    body: filters,
  })
}

export function useSendProposalsEmails(eventId) {
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
  return useMutation(() => sendProposalsEmails(eventId, filters))
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
