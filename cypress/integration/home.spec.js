describe('Homepage', function() {
  it('should load the homepage', function() {
    cy.visit('/')

    cy.contains('I\'m a speaker')
    cy.contains('I\'m an organizer')
  })
})