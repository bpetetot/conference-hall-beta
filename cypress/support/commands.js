import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const apiKey = Cypress.env('APP_API_KEY')
const authDomain = Cypress.env('APP_AUTH_DOMAIN')
const projectId = Cypress.env('APP_PROJECT_ID')

window.fbInstance = firebase.initializeApp({ apiKey, authDomain, projectId })

attachCustomCommands({ Cypress, cy, firebase })
