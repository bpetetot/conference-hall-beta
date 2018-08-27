import firebase from 'firebase/app'
import pick from 'lodash/pick'

import userCrud from 'firebase/user'
import { fetchUserOrganizations } from 'firebase/organizations'

export const signin = async (action, store) => {
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
  try {
    // signin
    await firebase.auth().signInWithPopup(provider)
    // save last connexion providerId in localstorage
    localStorage.setItem('providerId', providerId)
  } catch (error) {
    store.auth.update({ authenticated: false, uid: undefined, signinError: error })
  }
}

export const signinWithPassword = async (action, store, { form }) => {
  const signinForm = form('signin')
  const { email, password } = signinForm.getFormValues()

  if (!email || !password) {
    const signinError = { message: 'Email and Password are required.' }
    store.auth.update({ authenticated: false, uid: undefined, signinError })
    return
  }

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    // save last connexion providerId in localstorage
    localStorage.setItem('providerId', 'password')
  } catch (error) {
    store.auth.update({ authenticated: false, uid: undefined, signinError: error })
  }
}

export const signupWithPassword = async (action, store, { form }) => {
  const signupForm = form('signup')
  const { email, password } = signupForm.getFormValues()

  if (!email || !password) {
    const signupError = { message: 'Email and Password are required.' }
    store.auth.update({ authenticated: false, uid: undefined, signupError })
    return
  }

  try {
    // signup
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    // signin
    await firebase.auth().signInWithEmailAndPassword(email, password)
    // save last connexion providerId in localstorage
    localStorage.setItem('providerId', 'password')
  } catch (error) {
    store.auth.update({ authenticated: false, uid: undefined, signupError: error })
  }
}

export const sendForgetPasswordEmail = async (action, store) => {
  const { email, closeModal } = action.payload
  try {
    await firebase.auth().sendPasswordResetEmail(email)
    closeModal()
  } catch (error) {
    store.auth.update({ changePasswordError: error })
  }
}

export const signout = (action, store, { router }) => {
  firebase.auth().signOut()
  router.push('/')
}

export const signedIn = async (action, store, { router }) => {
  let user = pick(action.payload, ['uid', 'displayName', 'photoURL', 'email'])

  // set auth initialized and authenticated
  store.auth.update({
    initialized: true, authenticated: true, uid: user.uid, error: {},
  })

  // check if user exists in database
  const userRef = await userCrud.read(user.uid)
  const userDB = userRef.data()

  // set email as display name if doesnt exists
  if ((!userRef.exists && !user.displayName) || (userRef.exists && !userDB.displayName)) {
    user.displayName = user.email
  }

  if (userRef.exists) {
    user = { ...user, ...userDB }
  } else {
    // first connexion, add user in database
    await userCrud.create(user)
  }
  // add user in store
  store.data.users.add(user)

  // get users organizations
  const organizations = await fetchUserOrganizations(user.uid)
  store.data.organizations.set(organizations.docs.map(ref => ({ id: ref.id, ...ref.data() })))

  // go to the next url if exists
  const next = router.getQueryParam('next')
  if (next) {
    router.replace(next)
  }
}

export const signedOut = (action, store) => {
  store.auth.update({ initialized: true, authenticated: false, uid: undefined })
  store.data.users.reset()
}
