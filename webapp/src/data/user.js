import { getAuth } from 'firebase/auth'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

export function hasUserOrganizationRoles(user, organizationId, roles) {
  if (!user) return false
  if (!organizationId) return false
  if (!roles || roles.length === 0) return false
  const orgaId = parseInt(organizationId, 10)
  const { role } = user.organizations.find((o) => o.organizationId === orgaId) || {}
  return roles.includes(role)
}

async function getOrCreateUser() {
  let user
  try {
    user = await fetchData({ url: '/api/users/me', auth: true })
  } catch (error) {
    if (error.status !== 404) throw error
    const authUser = getAuth().currentUser
    user = fetchData({
      method: 'POST',
      url: '/api/users/me',
      auth: true,
      body: {
        uid: authUser.uid,
        name: authUser.displayName,
        email: authUser.email,
        photoURL: authUser.photoURL,
      },
    })
  }
  return user
}

export function useUser(isAuthenticated) {
  return useQuery('users/me', getOrCreateUser, { enabled: isAuthenticated, retry: false })
}

function useUpdateUser(onUpdate) {
  const queryClient = useQueryClient()
  return useMutation(
    (data) => {
      return fetchData({
        method: 'PATCH',
        url: '/api/users/me',
        auth: true,
        body: onUpdate(data),
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users/me')
      },
    },
  )
}

export function useUpdateProfile() {
  const onUpdate = (data) => ({
    ...data,
    address: data?.address?.address,
    lat: data?.address?.lat,
    lng: data?.address?.lng,
    timezone: data?.address?.timezone,
  })
  return useUpdateUser(onUpdate)
}

export function useResetUserProvider() {
  const onUpdate = () => {
    const user = getAuth().currentUser
    return {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    }
  }
  return useUpdateUser(onUpdate)
}

async function searchUsersByEmail({ queryKey }) {
  const [_key, email] = queryKey // eslint-disable-line no-unused-vars
  const encodedEmail = encodeURIComponent(email)
  return fetchData({
    method: 'GET',
    url: `/api/users?email=${encodedEmail}`,
    auth: true,
  })
}

export function useSearchUserByEmail(email) {
  return useQuery(['users', email], searchUsersByEmail, {
    enabled: !!email,
    retry: false,
  })
}
