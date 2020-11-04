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
      if (organizationId) {
        return organizationCrud.update({ id: organizationId, ...data })
      }
      return organizationCrud.create({
        ...data,
        members: { [user.uid]: ROLES.OWNER },
        owner: user.uid,
      })
    },
    {
      onSuccess: () => {
        cache.invalidateQueries(['organizations', user?.uid])
        cache.invalidateQueries(['organization', organizationId])
      },
    },
  )
}

export const useSetMembers = (organizationId) => {
  const [saveOrganization] = useSaveOrganization(organizationId)
  return (memberId, role = ROLES.MEMBER) => {
    return saveOrganization({ [`members.${memberId}`]: role })
  }
}

export const useUnsetMembers = (organizationId) => {
  const [saveOrganization] = useSaveOrganization(organizationId)
  return (memberId) => {
    return saveOrganization({ [`members.${memberId}`]: firebase.firestore.FieldValue.delete() })
  }
}

export const useLeaveOrganization = (organizationId) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const cache = useQueryCache()

  return useCallback(async () => {
    cache.invalidateQueries(['organizations', user?.uid])
    const leaveOrganization = firebase.functions().httpsCallable('leaveOrganization')
    await leaveOrganization({ organizationId })
    navigate('/organizer/organizations')
  }, [cache, user?.uid, organizationId, navigate])
}
