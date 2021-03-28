import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

// Get / Validate invitations
async function fetchInvite({ queryKey }) {
  const [_key, inviteUuid] = queryKey // eslint-disable-line no-unused-vars
  return fetchData({ url: `/api/invites/${inviteUuid}`, auth: true })
}

export function useInvite(inviteUuid) {
  return useQuery(['invite', inviteUuid], fetchInvite, { enabled: !!inviteUuid })
}

async function validateInvite(inviteUuid) {
  return fetchData({
    method: 'PUT',
    url: `/api/invites/${inviteUuid}/validate`,
    auth: true,
  })
}

export function useValidateInvite(inviteUuid) {
  const queryClient = useQueryClient()
  return useMutation(() => validateInvite(inviteUuid), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invite', inviteUuid])
    },
  })
}

// Talk Invites

async function fetchTalkInvite({ queryKey }) {
  const [_key, talkId] = queryKey // eslint-disable-line no-unused-vars
  const invite = await fetchData({ url: `/api/speaker/talks/${talkId}/invite`, auth: true })
  return invite?.uuid
}

export function useTalkInvite(talkId) {
  return useQuery(['invite/talk', talkId], fetchTalkInvite, { enabled: !!talkId })
}

async function generateTalkInvite(talkId) {
  return fetchData({
    method: 'POST',
    url: `/api/speaker/talks/${talkId}/invite`,
    auth: true,
  })
}

export function useGenerateTalkInvite(talkId) {
  const queryClient = useQueryClient()
  return useMutation(() => generateTalkInvite(talkId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invite/talk', talkId])
    },
  })
}

async function revokeTalkInvite(talkId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/speaker/talks/${talkId}/invite`,
    auth: true,
  })
}

export function useRevokeTalkInvite(talkId) {
  const queryClient = useQueryClient()
  return useMutation(() => revokeTalkInvite(talkId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invite/talk', talkId])
    },
  })
}

// Organization Invites

async function fetchOrganizationInvite({ queryKey }) {
  const [_key, organizationId] = queryKey // eslint-disable-line no-unused-vars
  const invite = await fetchData({
    url: `/api/organizer/organizations/${organizationId}/invite`,
    auth: true,
  })
  return invite?.uuid
}

export function useOrganizationInvite(organizationId) {
  return useQuery(['invite/organization', organizationId], fetchOrganizationInvite, {
    enabled: !!organizationId,
  })
}

async function generateOrganizationInvite(organizationId) {
  return fetchData({
    method: 'POST',
    url: `/api/organizer/organizations/${organizationId}/invite`,
    auth: true,
  })
}

export function useGenerateOrganizationInvite(organizationId) {
  const queryClient = useQueryClient()
  return useMutation(() => generateOrganizationInvite(organizationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invite/organization', organizationId])
    },
  })
}

async function revokeOrganizationInvite(organizationId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/organizer/organizations/${organizationId}/invite`,
    auth: true,
  })
}

export function useRevokeOrganizationInvite(organizationId) {
  const queryClient = useQueryClient()
  return useMutation(() => revokeOrganizationInvite(organizationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['invite/organization', organizationId])
    },
  })
}
