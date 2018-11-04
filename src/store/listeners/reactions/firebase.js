/* eslint-disable no-console, import/prefer-default-export */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

import { initFunctionCalls } from 'firebase/functionCalls'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

export const init = (action, store) => {
  try {
    firebase.initializeApp(config)

    // enable firestore
    const firestore = firebase.firestore()
    firestore.settings({ timestampsInSnapshots: true })

    // enable function calls
    firebase.functions()
    initFunctionCalls()
  } catch (error) {
    console.warn(error.code, error.message)
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      store.dispatch('@@firebase/SIGNED_OUT')
    } else {
      store.dispatch({ type: '@@firebase/SIGNED_IN', payload: user })
    }
  })
}
