/* eslint-disable no-console */
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

let app

if (!app) {
  app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE,
  })

  const auth = getAuth(app)
  const storage = getStorage(app)

  if (process.env.NODE_ENV !== 'production') {
    connectAuthEmulator(auth, 'http://localhost:9099')
    connectStorageEmulator(storage, 'localhost', 9199)

    console.info('Firebase emulators connected')
    console.info('- Auth emulator UI    : http://localhost:4000/auth')
    console.info('- Storage emulator UI : http://localhost:4000/storage')
  }
}
