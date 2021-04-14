import firebase from 'firebase/app'
import { useQuery } from 'react-query'

import { fetchData, HttpError } from './fetch'

export type User = {
  id: number
  uid: string
  email?: string | null
  name?: string | null
  bio?: string | null
  photoURL?: string | null
  betaAccess?: string | null
  github?: string | null
  company?: string | null
  language?: string | null
  references?: string | null
  twitter?: string | null
  address?: string | null
  lat?: number | null
  lng?: number | null
  timezone?: string | null
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
