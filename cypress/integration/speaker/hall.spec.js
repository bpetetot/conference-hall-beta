import elements from '../../elements.json'
import links from '../../links.json'

describe('Speaker Hall', () => {
  before(() => {
    cy.login()
    cy.visit(links.speaker.hall)
  })

  after(() => { cy.logoutFirebase() })

  it('Check the Speaker Hall page', () => {
    cy.contains('Speaker Hall')
    cy.contains('My talks')
    cy.contains('No talk yet! You should create your first talk')
  })

  it('Check navbar dropdown', () => {
    cy.get(elements.navbar.dropdown).click({ force: true })
    cy.get(elements.navbar.dropdownMenu).contains('Conference Hall').should('have.attr', 'href', links.home)
    cy.get(elements.navbar.dropdownMenu).contains('Contributors').should('have.attr', 'href', links.speaker.contributors)
  })

  it('Check links', () => {
    cy.get(elements.sidebar).contains('My talks').should('have.attr', 'href', links.speaker.hall)
    cy.get(elements.sidebar).contains('Profile').should('have.attr', 'href', links.speaker.profile)
    cy.get(elements.main.titlebarLink).should('have.attr', 'href', links.speaker.createTalk)
    cy.get(elements.main.noResultLink).should('have.attr', 'href', links.speaker.createTalk)
  })
})
