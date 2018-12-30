import pathToRegexp from 'path-to-regexp'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const apiKey = Cypress.env('APP_API_KEY')
const authDomain = Cypress.env('APP_AUTH_DOMAIN')
const projectId = Cypress.env('APP_PROJECT_ID')

window.fbInstance = firebase.initializeApp({ apiKey, authDomain, projectId })

attachCustomCommands({ Cypress, cy, firebase })

Cypress.Commands.add('getDataTest', (name, options) => cy.get(`[data-test="${name}"]`, options))

Cypress.Commands.add('getUrlParam', (path, index = 0) => {
  cy.url()
    .then((url) => {
      const talkRoute = pathToRegexp(path)
      const sanitizedUrl = url.replace(Cypress.config().baseUrl, '')
      const params = talkRoute.exec(sanitizedUrl)
      return params[index + 1]
    })
})

Cypress.Commands.add('logoutFirebase', () => {
  cy.log('Confirming use is logged out...')
  if (!firebase.auth().currentUser) {
    cy.log('Current user already logged out.')
  } else {
    cy.log('Current user exists, logging out...')
    firebase.auth().signOut()
  }
})
