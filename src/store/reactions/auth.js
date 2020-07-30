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
  localStorage.removeItem('currentEventId')
}

export const signedIn = async (action, store) => {
  let user = pick(action.payload, ['uid', 'displayName', 'photoURL', 'email'])

  // set auth authenticated
  store.auth.update({ authenticated: true, uid: user.uid })

  // check if user exists in database
  const userRef = await userCrud.read(user.uid)
  if (userRef.exists) {
    // get user info from db
    user = userRef.data()
  } else {
    // first connexion, add user in database
    await userCrud.create(user)
  }
  // add user in store
  store.data.users.add(user)

  // get users organizations
  const organizations = await fetchUserOrganizations(user.uid)
  store.data.organizations.set(organizations)

  // go to the redirect url if exists
  store.dispatch('@@router/REDIRECT_TO_NEXT_URL')
}

export const signedOut = (action, store) => {
  store.auth.update({ authenticated: false, uid: undefined })
  store.data.users.reset()
}
