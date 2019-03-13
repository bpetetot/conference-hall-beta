import firebase from 'firebase/app'
import pick from 'lodash/pick'

import userCrud from 'firebase/user'
import { fetchUserOrganizations } from 'firebase/organizations'

export const signin = (action) => {
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
  provider.setCustomParameters({
    prompt: 'select_account',
  })

  firebase.auth().signInWithRedirect(provider)
}

export const signout = (action, store, { router }) => {
  firebase.auth().signOut()
  router.push('home')
}

export const signedIn = async (action, store) => {
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

  // get users organizations
  const organizations = await fetchUserOrganizations(user.uid)
  store.data.organizations.set(organizations.docs.map(ref => ({ id: ref.id, ...ref.data() })))

  // go to the redirect url if exists
  store.dispatch('@@router/REDIRECT_TO_NEXT_URL')
}

export const signedOut = (action, store) => {
  store.auth.update({ initialized: true, authenticated: false, uid: undefined })
  store.data.users.reset()
}
