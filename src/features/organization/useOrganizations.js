/* eslint-disable react/jsx-filename-extension */
import firebase from 'firebase/app'
import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryCache } from 'react-query'

import organizationCrud, { fetchUserOrganizations } from 'firebase/organizations'
import { useAuth } from 'features/auth'
import { ROLES } from 'firebase/constants'

export const useOrganizations = () => {
  const { user } = useAuth()
  return useQuery(['organizations', user?.uid], async (key, userId) => {
    if (!userId) return {}
    return fetchUserOrganizations(userId)
  })
}

export const useOrganization = (organizationId) => {
  const { organizationId: routeId } = useParams()
  return useQuery(['organization', organizationId || routeId], async (key, id) => {
    if (!id) return null
    const result = await organizationCrud.read(id)
    return result.data()
  })
}

export const useSaveOrganization = (organizationId) => {
  const { user } = useAuth()
  const cache = useQueryCache()
  return useMutation(
    (data) => {
      if (organizationId) return organizationCrud.update(data)
      return organizationCrud.create({
        ...data,
        members: { [user.uid]: ROLES.OWNER },
        owner: user.uid,
      })
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['organizations'])
        cache.invalidateQueries(['organization', organizationId])
      },
    },
  )
}

export const useSetMembers = (organizationId) => {
  const cache = useQueryCache()
  return useMutation(
    ({ memberId, role = ROLES.MEMBER }) => {
      return organizationCrud.update({ id: organizationId, [`members.${memberId}`]: role })
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['organization', organizationId])
      },
    },
  )
}

export const useUnsetMembers = (organizationId) => {
  const cache = useQueryCache()
  return useMutation(
    ({ memberId, leave }) => {
      if (leave) return null
      return organizationCrud.update({
        id: organizationId,
        [`members.${memberId}`]: firebase.firestore.FieldValue.delete(),
      })
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['organization', organizationId])
      },
    },
  )
}

export const useLeaveOrganization = (organizationId) => {
  const navigate = useNavigate()
  const cache = useQueryCache()

  const leaverOrganization = useCallback(async () => {
    const leaveOrganization = firebase.functions().httpsCallable('leaveOrganization')
    await leaveOrganization({ organizationId })
    navigate('/organizer/organizations')
    cache.invalidateQueries(['organizations'])
  }, [navigate, cache, organizationId])

  return leaverOrganization
}
