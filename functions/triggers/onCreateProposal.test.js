/* eslint-disable no-undef */
const sinon = require('sinon')
const admin = require('firebase-admin')
// Require and initialize firebase-functions-test. Since we are not passing in any parameters,
// it will be initialized in an "offline mode".
const test = require('firebase-functions-test')()

const onCreateProposal = require('./onCreateProposal')
const email = require('../email')

describe('onCreateProposal', () => {
  const eventId = 'wpYPL2EC3WzxUqY77rQZ'
  const talk = {
    abstract: 'abstract',
    id: 'sVZIvr2qrEUvni64Oabo',
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    title: 'title',
  }
  const event = {
    type: 'conference',
    surveyActive: false,
    cfpDates: { start: { toDate: () => {} }, end: { toDate: () => {} } },
    visibility: 'public',
    displayOrganizersRatings: false,
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    name: 'RivieraDEV 2019',
    id: 'wpYPL2EC3WzxUqY77rQZ',
  }
  const user = {
    betaAccess: 'XXX',
    company: 'RivieraDEV',
    email: 'corinnekrych@gmail.com',
    uid: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    language: 'France',
    displayName: 'Corinne Krych',
  }
  // mock DB
  const databaseStub = sinon.stub()
  const collectionStub = sinon.stub()
  const fieldValueStub = sinon.stub()
  const timestampStub = sinon.stub()
  // mock event queries
  const docEventStub = sinon.stub()
  const getEventStub = sinon.stub()
  const collectionProposalStub = sinon.stub()
  // mock getUsers
  const docUserStub = sinon.stub()
  // mock snap.data()
  const snap = {
    data: () => talk,
  }
  // mock email.send
  let emailSend
  conf = { mailgun: { domain: 'somedomain.org', key: 'SOME-SECRET' }, app: { url: 'https://somefirebase.url' } }
  beforeEach(() => {
    test.mockConfig(conf)
    // mock firestore DB static methods
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    Object.defineProperty(admin.firestore, 'FieldValue', { get: () => fieldValueStub, configurable: true })
    Object.defineProperty(admin.firestore.FieldValue, 'serverTimestamp', { get: () => timestampStub, configurable: true })
    databaseStub.returns({ collection: collectionStub })
    // mock getEvent
    collectionStub.withArgs('events').returns({ doc: docEventStub })
    docEventStub.withArgs(eventId).returns({
      get: getEventStub,
      collection: collectionProposalStub,
    })
    getEventStub.returns(Promise.resolve({ data: () => event }))
    // mock getUsers
    collectionStub.withArgs('users').returns({ doc: docUserStub, exists: true })
    docUserStub.withArgs('ibBeWNBzL3XVc0teerodftWdYzD2').returns({ get: () => new Promise(resolve => resolve({ data: () => user, exists: true })) })
    emailSend = sinon.stub(email, 'send').callsFake(() => {})
  })
  afterEach(() => {
    sinon.reset()
    emailSend.restore()
  })

  it('should send email to speakers after submission for a conference', async () => {
    // given
    // when
    const onCreateProposalWrapped = test.wrap(onCreateProposal)
    await onCreateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: '' } })
    // then
    sinon.assert.match(emailSend.calledOnce, true)
    sinon.assert.calledWith(emailSend, sinon.match({
      domain: 'somedomain.org',
      key: 'SOME-SECRET',
    }), sinon.match({
      to: ['corinnekrych@gmail.com'],
      subject: '[RivieraDEV 2019] Talk submitted',
      html: sinon.match.any,
      confName: 'RivieraDEV 2019',
    }))
    sinon.assert.match(docEventStub.calledOnce, true)
  })

  it('should send email to speakers and organizers after submission for a meetup', async () => {
    // given
    event.type = 'meetup'
    // when
    const onCreateProposalWrapped = test.wrap(onCreateProposal)
    await onCreateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: '' } })
    // then
    sinon.assert.match(emailSend.calledTwice, true)
    sinon.assert.calledWith(emailSend.firstCall, sinon.match({
      domain: 'somedomain.org',
      key: 'SOME-SECRET',
    }), sinon.match({
      to: ['corinnekrych@gmail.com'],
      subject: '[RivieraDEV 2019] Talk submitted',
      html: sinon.match.any,
      confName: 'RivieraDEV 2019',
    }))
    sinon.assert.calledWith(emailSend.secondCall, sinon.match({
      domain: 'somedomain.org',
      key: 'SOME-SECRET',
    }), sinon.match({
      to: ['corinnekrych@gmail.com'],
      subject: '[RivieraDEV 2019] New talk submitted',
      html: sinon.match.any,
      confName: 'RivieraDEV 2019',
    }))
    sinon.assert.match(docEventStub.calledOnce, true)
  })
})
