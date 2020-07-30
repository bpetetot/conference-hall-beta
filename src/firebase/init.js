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
initFunctionCalls()
