describe('Organizer Hall', () => {
  before(() => {
    cy.login()
    cy.visit('/organizer')
  })

  after(() => { cy.logoutFirebase() })

  it('Check the Organizer Hall page', () => {
    cy.contains('Organizer Hall')
    cy.contains('My events')
    cy.contains('Create event')
    cy.contains('No event yet !')
  })

  it('Check navbar dropdown', () => {
    cy.get('.navbar .dropdown').click({ force: true })
    cy.get('.navbar .dropdown-menu').contains('Conference Hall').should('have.attr', 'href', '/')
    cy.get('.navbar .dropdown-menu').contains('Contributors').should('have.attr', 'href', '/organizer/contributors')
  })

  it('Check links', () => {
    cy.get('.sidebar').contains('My events').should('have.attr', 'href', '/organizer')
    cy.get('.sidebar').contains('My organizations').should('have.attr', 'href', '/organizer/organizations')
    cy.get('.layout-main .titlebar-actions a').should('have.attr', 'href', '/organizer/event/create')
  })
})
