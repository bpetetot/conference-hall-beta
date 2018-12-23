import elements from '../../elements.json'
import links from '../../links.json'

describe('Organizer Hall', () => {
  before(() => {
    cy.login()
    cy.visit(links.organizer.hall)
  })

  after(() => { cy.logoutFirebase() })

  it('Check the Organizer Hall page', () => {
    cy.contains('Organizer Hall')
    cy.contains('My events')
    cy.contains('Create event')
    cy.contains('No event yet !')
  })

  it('Check navbar dropdown', () => {
    cy.get(elements.navbar.dropdown).click({ force: true })
    cy.get(elements.navbar.dropdownMenu).contains('Conference Hall').should('have.attr', 'href', links.home)
    cy.get(elements.navbar.dropdownMenu).contains('Contributors').should('have.attr', 'href', links.organizer.contributors)
  })

  it('Check links', () => {
    cy.get(elements.sidebar).contains('My events').should('have.attr', 'href', links.organizer.hall)
    cy.get(elements.sidebar).contains('My organizations').should('have.attr', 'href', links.organizer.organizations)
    cy.get(elements.main.titlebarLink).should('have.attr', 'href', links.organizer.createEvent)
  })
})
