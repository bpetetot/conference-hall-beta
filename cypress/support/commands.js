import firebase from 'firebase/app'
import 'firebase/auth'

const apiKey = Cypress.env('APP_API_KEY')
const authDomain = Cypress.env('APP_AUTH_DOMAIN')
const projectId = Cypress.env('APP_PROJECT_ID')
const token = Cypress.env('APP_TOKEN')

firebase.initializeApp({ apiKey, authDomain, projectId })

Cypress.Commands.add('clearFirestore', () => {
  cy.exec(`firebase --project ${projectId} --token ${token} firestore:delete --all-collections --yes`)
})

Cypress.Commands.add('login', () => {
  firebase.auth().signInWithEmailAndPassword('cypress@conference-hall.io', 'cypress')
})

Cypress.Commands.add('logout', () => {
  firebase.auth().signOut()
})
