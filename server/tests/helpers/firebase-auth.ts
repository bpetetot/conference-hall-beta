import firebase from 'firebase'

export type AuthUser = {
  token?: string
  uid?: string
}

firebase.initializeApp({
  projectId: 'conference-hall',
  apiKey: 'XXX',
})

firebase.auth().useEmulator('http://localhost:9099')

export async function getAuthUser(email: string): Promise<AuthUser> {
  let credentials: firebase.auth.UserCredential
  try {
    credentials = await firebase.auth().createUserWithEmailAndPassword(email, 'password')
  } catch (error) {
    if (error.code !== 'auth/email-already-in-use') {
      throw new Error(error)
    }
    credentials = await firebase.auth().signInWithEmailAndPassword(email, 'password')
  }

  if (!credentials || !credentials.user) {
    return { token: undefined, uid: undefined }
  }

  const token = await credentials.user.getIdToken(true)

  return { token, uid: credentials.user.uid }
}
