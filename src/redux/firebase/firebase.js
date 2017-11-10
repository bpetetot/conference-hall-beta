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
  const app = firebase.initializeApp(config)

  // initialize firestore
  app.firestore()

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
