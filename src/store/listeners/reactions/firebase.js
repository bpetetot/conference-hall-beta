/* eslint-disable no-console, import/prefer-default-export */
import { reaction } from 'k-ramel'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

export const init = reaction((action, store) => {
  try {
    firebase.initializeApp(config)
    firebase.firestore().enablePersistence()
    firebase.firestore()
  } catch (error) {
    console.warn(error.code, error.message)
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      store.dispatch({ type: '@@firebase/SIGNED_OUT' })
    } else {
      store.dispatch({ type: '@@firebase/SIGNED_IN', payload: user })
    }
  })
})
