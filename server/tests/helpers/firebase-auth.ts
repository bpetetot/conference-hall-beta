import { initializeApp } from 'firebase/app'
import {
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator,
} from 'firebase/auth'

export type AuthUser = {
  token?: string
  uid?: string
}

const firebaseApp = initializeApp({
  projectId: 'conference-hall',
  apiKey: 'XXX',
})

const auth = getAuth(firebaseApp)

connectAuthEmulator(auth, 'http://localhost:9099')

export async function getAuthUser(email: string): Promise<AuthUser> {
  let credentials: UserCredential
  try {
    credentials = await createUserWithEmailAndPassword(auth, email, 'password')
  } catch (error) {
    if (error.code !== 'auth/email-already-in-use') {
      throw new Error(error)
    }
    credentials = await signInWithEmailAndPassword(auth, email, 'password')
  }

  if (!credentials || !credentials.user) {
    return { token: undefined, uid: undefined }
  }

  const token = await credentials.user.getIdToken(true)

  return { token, uid: credentials.user.uid }
}
