import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
}

// initialize firebase
firebase.initializeApp(config)

// initialize auth emulator
const auth = firebase.auth()
auth.useEmulator('http://localhost:9099')
