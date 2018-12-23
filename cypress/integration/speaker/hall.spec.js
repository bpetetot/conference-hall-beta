describe('Speaker Hall', () => {
  before(() => {
    cy.login()
    cy.visit('/speaker')
  })

  after(() => { cy.logoutFirebase() })

  it('Check the Speaker Hall page', () => {
    cy.contains('Speaker Hall')
    cy.contains('My talks')
    cy.contains('No talk yet! You should create your first talk')
  })

  it('Check navbar dropdown', () => {
    cy.get('.navbar .dropdown').click({ force: true })
    cy.get('.navbar .dropdown-menu').contains('Conference Hall').should('have.attr', 'href', '/')
    cy.get('.navbar .dropdown-menu').contains('Contributors').should('have.attr', 'href', '/speaker/contributors')
  })

  it('Check links', () => {
    cy.get('.sidebar').contains('My talks').should('have.attr', 'href', '/speaker')
    cy.get('.sidebar').contains('Profile').should('have.attr', 'href', '/speaker/profile')
    cy.get('.layout-main .titlebar-actions a').should('have.attr', 'href', '/speaker/talk/create')
    cy.get('.layout-main .no-result a').should('have.attr', 'href', '/speaker/talk/create')
  })
})
