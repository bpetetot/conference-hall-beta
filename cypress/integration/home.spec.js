import links from '../links'

describe('Homepage', () => {
  it('Check the Homepage', () => {
    cy.visit(links.home)
    cy.contains('I\'m a speaker')
    cy.contains('I\'m an organizer')
  })
})
