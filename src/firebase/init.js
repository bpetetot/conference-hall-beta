/* eslint-disable no-console, import/prefer-default-export */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

import { initFunctionCalls } from './functionCalls'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
}

// initialize firebase
firebase.initializeApp(config)

// enable firestore
firebase.firestore()

// enable function calls
firebase.functions()

if (process.env.NODE_ENV === 'development') {
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.functions().useEmulator('localhost', 5001)
}

initFunctionCalls()
