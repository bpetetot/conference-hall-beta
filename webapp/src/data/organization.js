import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '../features/auth'
import { fetchData } from './fetch'

const parseOrgaResponse = (orga) => ({
  ...orga,
  createdAt: new Date(orga.createdAt),
})

async function fetchOrganizations() {
  const orgas = await fetchData({
    method: 'GET',
    url: '/api/organizer/organizations',
    auth: true,
  })
  return orgas.map(parseOrgaResponse)
}

export function useOrganizations() {
  return useQuery('organizations', fetchOrganizations)
}

export function useOrganizationsForRoles(roles) {
  const { user } = useAuth()
  const { data = [] } = useOrganizations()
  const allowedOrganizations = user.organizations
    .filter((o) => roles.includes(o.role))
    .map((o) => o.organizationId)
  return data.filter((o) => allowedOrganizations.includes(o.id))
}

async function createOrganization(data) {
  return fetchData({
    method: 'POST',
    url: '/api/organizer/organizations',
    auth: true,
    body: { name: data.name },
  })
}

export function useCreateOrganization() {
  const queryClient = useQueryClient()
  return useMutation(createOrganization, {
    onSuccess: () => {
      queryClient.invalidateQueries('users/me')
    },
  })
}

async function updateOrganization(organizationId, data) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/organizations/${organizationId}`,
    auth: true,
    body: { name: data.name },
  })
}

export function useUpdateOrganization(organizationId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateOrganization(organizationId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['organization', String(organizationId)])
    },
  })
}

async function fetchOrganization({ queryKey }) {
  const [_key, organizationId] = queryKey // eslint-disable-line no-unused-vars
  const orga = await fetchData({
    method: 'GET',
    url: `/api/organizer/organizations/${organizationId}`,
    auth: true,
  })
  return parseOrgaResponse(orga)
}

export function useOrganization(organizationId) {
  return useQuery(['organization', String(organizationId)], fetchOrganization, {
    enabled: !!organizationId,
  })
}

async function fetchOrganizationMembers({ queryKey }) {
  const [_key, organizationId] = queryKey // eslint-disable-line no-unused-vars
  return fetchData({
    method: 'GET',
    url: `/api/organizer/organizations/${organizationId}/members`,
    auth: true,
  })
}

export function useOrganizationMembers(organizationId) {
  return useQuery(['organization/members', organizationId], fetchOrganizationMembers, {
    enabled: !!organizationId,
  })
}

async function addMember(organizationId, memberId) {
  return fetchData({
    method: 'POST',
    url: `/api/organizer/organizations/${organizationId}/members/${memberId}`,
    auth: true,
  })
}

export function useAddMember(organizationId) {
  const queryClient = useQueryClient()
  return useMutation((memberId) => addMember(organizationId, memberId), {
    onSuccess: () => {
      queryClient.invalidateQueries('organization/members')
    },
  })
}

async function removeMember(organizationId, memberId) {
  return fetchData({
    method: 'DELETE',
    url: `/api/organizer/organizations/${organizationId}/members/${memberId}`,
    auth: true,
  })
}

export function useRemoveMember(organizationId, memberId) {
  const queryClient = useQueryClient()
  return useMutation(() => removeMember(organizationId, memberId), {
    onSuccess: () => {
      queryClient.invalidateQueries('organization/members')
      queryClient.invalidateQueries('users/me')
    },
  })
}

async function updateMemberRole(organizationId, memberId, role) {
  return fetchData({
    method: 'PATCH',
    url: `/api/organizer/organizations/${organizationId}/members/${memberId}`,
    auth: true,
    body: { role },
  })
}

export function useUpdateMemberRole(organizationId, memberId) {
  const queryClient = useQueryClient()
  return useMutation((role) => updateMemberRole(organizationId, memberId, role), {
    onSuccess: () => {
      queryClient.invalidateQueries('organization/members')
    },
  })
}
