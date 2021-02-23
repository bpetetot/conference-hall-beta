import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function hasUserOrganizationRoles(user, organizationId, roles) {
  if (!user) return false
  if (!organizationId) return false
  if (!roles || roles.length === 0) return false
  const orgaId = parseInt(organizationId, 10) // TODO find a way to parse id in useParams
  const { role } = user.organizations.find((o) => o.organizationId === orgaId) || {}
  return roles.includes(role)
}

async function getOrCreateUser() {
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  let response = await fetch('http://localhost:3001/users/me', auth)
  if (response.status === 404) {
    const authUser = firebase.auth().currentUser
    response = await fetch('http://localhost:3001/users/me', {
      ...auth,
      method: 'post',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      body: JSON.stringify({
        uid: authUser.uid,
        name: authUser.displayName,
        email: authUser.email,
        photoURL: authUser.photoURL,
      }),
    })
  }
  return response.json()
}

export function useUser(isAuthenticated) {
  return useQuery('users/me', () => getOrCreateUser(), {
    enabled: isAuthenticated,
  })
}

async function updateUser(data) {
  const token = await firebase.auth().currentUser.getIdToken()
  await fetch('http://localhost:3001/users/me', {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation((data) => updateUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users/me')
    },
  })
}

export function useResetUserProvider() {
  const queryClient = useQueryClient()
  return useMutation(
    () => {
      const user = firebase.auth().currentUser
      return updateUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users/me')
      },
    },
  )
}

async function searchUsersByEmail(email) {
  const encodedEmail = encodeURIComponent(email)
  const token = await firebase.auth().currentUser.getIdToken()
  const auth = { headers: { authorization: `Bearer ${token}` } }
  try {
    const response = await fetch(`http://localhost:3001/users?email=${encodedEmail}`, auth)
    if (response.status !== 200) {
      return []
    }
    return response.json()
  } catch (err) {
    return []
  }
}

export function useSearchUserByEmail(email) {
  return useQuery(['users', email], () => searchUsersByEmail(email), {
    enabled: !!email,
  })
}
