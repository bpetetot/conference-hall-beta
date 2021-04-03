import 'firebase/auth'

import firebase from 'firebase/app'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })
}

if (process.env.NODE_ENV !== 'production') {
  firebase.auth().useEmulator('http://localhost:9099')
}

export async function signinWithFirebase(providerName: string) {
  let provider
  switch (providerName) {
    case 'twitter':
      provider = new firebase.auth.TwitterAuthProvider()
      break
    case 'github':
      provider = new firebase.auth.GithubAuthProvider()
      break
    case 'facebook':
      provider = new firebase.auth.FacebookAuthProvider()
      break
    case 'google':
    default:
      provider = new firebase.auth.GoogleAuthProvider()
  }
  provider.setCustomParameters({ prompt: 'select_account' })
  return firebase.auth().signInWithRedirect(provider)
}

export default firebase
