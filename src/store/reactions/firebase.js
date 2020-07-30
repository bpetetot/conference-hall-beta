/* eslint-disable no-console, import/prefer-default-export */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

import { preloadFunctions } from 'firebase/functionCalls'

export const init = (action, store) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch({ type: '@@firebase/SIGNED_IN', payload: user })
      preloadFunctions()
    } else {
      store.dispatch('@@firebase/SIGNED_OUT')
    }
  })
}
