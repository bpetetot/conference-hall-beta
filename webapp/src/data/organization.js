import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAuth } from '../features/auth'

async function fetchUserOrganizations() {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch('/api/organizer/organizations', auth)
  const talks = await response.json()
  return talks.map((talk) => ({
    ...talk,
    id: parseInt(talk.id, 10),
    createdAt: new Date(talk.createdAt),
  }))
}

export function useOrganizations() {
  return useQuery('organizations', () => fetchUserOrganizations(), {
    initialData: [],
  })
}

export function useOrganizationsForRoles(roles) {
  const { user } = useAuth()
  const { data } = useOrganizations()
  const allowedOrganizations = user.organizations
    .filter((o) => roles.includes(o.role))
    .map((o) => o.organizationId)
  return data.filter((o) => allowedOrganizations.includes(o.id))
}

async function createOrganization(data) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch('/api/organizer/organizations', {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ name: data.name }),
  })
  return response.json()
}

export function useCreateOrganization() {
  const queryClient = useQueryClient()
  return useMutation((data) => createOrganization(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('organizations')
      queryClient.invalidateQueries('users/me')
    },
  })
}

async function updateOrganization(organizationId, data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/organizations/${organizationId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ name: data.name }),
  })
}

export function useUpdateOrganization(organizationId) {
  const queryClient = useQueryClient()
  return useMutation((data) => updateOrganization(organizationId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('organizations')
      queryClient.invalidateQueries(['organization', organizationId])
    },
  })
}

async function fetchOrganization(id) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`/api/organizer/organizations/${id}`, auth)
  const talk = await response.json()
  return {
    ...talk,
    id: parseInt(talk.id, 10),
    createdAt: new Date(talk.createdAt),
  }
}

export function useOrganization(organizationId) {
  return useQuery(['organization', organizationId], () => fetchOrganization(organizationId), {
    enabled: !!organizationId,
  })
}

async function fetchOrganizationMembers(id) {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  const response = await fetch(`/api/organizer/organizations/${id}/members`, auth)
  const members = await response.json()
  return members.map((member) => ({
    ...member,
    id: parseInt(member.id, 10),
  }))
}

export function useOrganizationMembers(organizationId) {
  return useQuery(
    ['organization/members', organizationId],
    () => fetchOrganizationMembers(organizationId),
    {
      enabled: !!organizationId,
    },
  )
}

async function addMember(organizationId, memberId) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/organizations/${organizationId}/members/${memberId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
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
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/organizations/${organizationId}/members/${memberId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
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
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch(`/api/organizer/organizations/${organizationId}/members/${memberId}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ role }),
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
