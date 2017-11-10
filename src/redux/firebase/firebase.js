/* eslint-disable no-console */
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

export const middleware = ({ dispatch }) => (next) => {
  // initialize firebase app
  firebase.initializeApp(config)

  // initialize firestore
  firebase
    .firestore()
    .enablePersistence()
    .then(() => firebase.firestore())
    .catch((error) => {
      if (error.code === 'failed-precondition') {
        console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (error.code === 'unimplemented') {
        console.error('The current browser does not support all of the features required to enable persistence')
      }
    })

  // intialize authentication locale
  firebase.auth().useDeviceLanguage()

  // manage authenticated user status
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      const {
        uid, displayName, email, photoURL,
      } = user
      dispatch({
        type: 'FIREBASE_SIGNIN',
        payload: {
          uid,
          displayName,
          email,
          photoURL,
        },
      })
    } else {
      // No user is signed in.
      dispatch({ type: 'FIREBASE_SIGNOUT' })
    }
  })

  return action => next(action)
}

export default firebase
