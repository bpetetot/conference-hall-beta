import { reaction } from 'k-ramel'
import firebase from 'firebase/app'
import pick from 'lodash/pick'

import userCrud from 'firebase/user'

export const signin = reaction((action) => {
  const providerId = action.payload
  let provider
  switch (providerId) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider()
      break
    case 'twitter':
      provider = new firebase.auth.TwitterAuthProvider()
      break
    case 'github':
      provider = new firebase.auth.GithubAuthProvider()
      break
    case 'facebook':
      provider = new firebase.auth.FacebookAuthProvider()
      break
    default:
      return
  }
  firebase.auth().signInWithPopup(provider)
})

export const signout = reaction((action, store, { router }) => {
  firebase.auth().signOut()
  router.push('/')
})

export const signedIn = reaction(async (action, store, { router }) => {
  let user = pick(action.payload, ['uid', 'displayName', 'photoURL', 'email'])

  // set auth initialized and authenticated
  store.auth.update({ initialized: true, authenticated: true, uid: user.uid })

  // check if user exists in database
  const userRef = await userCrud.read(user.uid)
  if (userRef.exists) {
    user = { ...userRef.data(), ...user }
  } else {
    // first connexion, add user in database
    await userCrud.create(user)
  }
  // add user in store
  store.data.users.add(user)

  // go to the next url if exists
  const next = router.getQueryParam('next')
  if (next) {
    router.replace(next)
  }
})

export const signedOut = reaction((action, store) => {
  store.auth.update({ initialized: true, authenticated: false, uid: undefined })
  store.data.users.reset()
})
