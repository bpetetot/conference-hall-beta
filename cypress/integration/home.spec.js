describe('Homepage', () => {
  it('Check the Homepage', () => {
    cy.visit('/')
    cy.contains('I\'m a speaker')
    cy.contains('I\'m an organizer')
  })
})
