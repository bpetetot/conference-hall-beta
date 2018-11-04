/* eslint-disable */
describe('Homepage', () => {
  before(() => { cy.login() })

  after(() => { cy.logout() })

  it('check the homepage', () => {
    cy.visit('/')
    cy.contains('I\'m a speaker')
    cy.contains('I\'m an organizer')
  })

  it('check the speaker page', () => {
    cy.visit('/speaker')
    cy.contains('Speaker Hall')
  })

  it('check the organizer page', () => {
    cy.visit('/organizer')
    cy.contains('Organizer Hall')
  })
})