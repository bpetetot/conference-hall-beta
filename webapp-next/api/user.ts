import firebase from 'firebase/app'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { fetchData, HttpError } from './fetch'

export type User = {
  id: number
  uid: string
  email?: string
  name?: string
  bio?: string
  photoURL?: string
  betaAccess?: string
  github?: string
  company?: string
  language?: string
  references?: string
  twitter?: string
  address?: string
  lat?: number
  lng?: number
  timezone?: string
}

async function getOrCreateUser(): Promise<User> {
  let user: User
  try {
    user = await fetchData({ url: '/api/users/me', auth: true })
  } catch (error) {
    if (error.status !== 404) throw error
    const authUser = firebase.auth().currentUser
    if (!authUser) {
      throw new HttpError(401, { message: 'Not authorized' })
    }
    user = await fetchData({
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

export function useUser(isAuthenticated: boolean) {
  return useQuery('users/me', getOrCreateUser, { enabled: isAuthenticated, retry: false })
}

async function updateUser(data: Partial<User>) {
  return fetchData({
    method: 'PATCH',
    url: '/api/users/me',
    auth: true,
    body: data,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation<void, HttpError, Partial<User>>(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users/me')
    },
  })
}

export function useResetUser() {
  const user = firebase.auth().currentUser
  const data = {
    name: user?.displayName || undefined,
    email: user?.email || undefined,
    photoURL: user?.photoURL || undefined,
  }
  const { mutate } = useUpdateUser()
  return () => {
    mutate(data)
    return data
  }
}
