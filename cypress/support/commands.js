/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: Cypress.env('APP_API_KEY'),
  authDomain: Cypress.env('APP_AUTH_DOMAIN'),
  projectId: Cypress.env('APP_PROJECT_ID'),
}

firebase.initializeApp(config)

Cypress.Commands.add('login', () => {
  firebase.auth().signInWithEmailAndPassword('cypress@conference-hall.io', 'cypress')
})

Cypress.Commands.add('logout', () => {
  firebase.auth().signOut()
})
