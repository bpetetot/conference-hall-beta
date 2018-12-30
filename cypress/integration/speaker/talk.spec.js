describe('Talk', () => {
  before(() => {
    cy.login()
  })

  after(() => { cy.logoutFirebase() })

  describe('Talk creation', () => {
    afterEach(() => {
      cy.getUrlParam('/speaker/talk/:talkId')
        .then((talkId) => {
          cy.callFirestore('delete', `talks/${talkId}`)
        })
    })

    it('create a new talk', () => {
      cy.visit('/speaker/talk/create')
        .getDataTest('title')
        .type('My talk title')
        .getDataTest('abstract')
        .type('My talk abstract')
        .getDataTest('level-beginner')
        .click()
        .getDataTest('references')
        .type('My talk references')
        .getDataTest('submit')
        .click()
        .getDataTest('talk-level')
        .should('contain', 'beginner')
        .getDataTest('talk-abstract')
        .should('contain', 'My talk abstract')
        .getDataTest('talk-references')
        .should('contain', 'My talk references')
    })
  })
})
