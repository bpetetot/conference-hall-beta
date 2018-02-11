import { reaction } from 'k-ramel'
import firebase from 'firebase/app'
import pick from 'lodash/pick'
import { push, replace } from 'redux-little-router'

import userCrud from 'firebase/user'

export const signin = reaction(() => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
})

export const signout = reaction((action, store) => {
  firebase.auth().signOut()
  store.dispatch(push('/'))
})

export const signedIn = reaction((action, store) => {
  let user = pick(action.payload, ['uid', 'displayName', 'photoURL', 'email'])

  // set auth initialized and authenticated
  store.auth.set({ initialized: true, authenticated: true, uid: user.uid })

  // check if user exists in database
  const ref = userCrud.read(user.uid)
  if (ref.exists) {
    user = { ...ref.data(), ...user }
  } else {
    // first connexion, add user in database
    userCrud.create(user)
  }
  // add user in store
  store.data.users.add(user)

  // go to the next url if exists
  const { next } = store.getState().router.query
  if (next) {
    store.dispatch(replace(next))
  }
})

export const signedOut = reaction((action, store) => {
  store.auth.set({ initialized: true, authenticated: false, uid: undefined })
  store.data.users.reset()
})
