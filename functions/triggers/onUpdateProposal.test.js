/* eslint-disable no-undef */
const sinon = require('sinon')
const admin = require('firebase-admin')
// Require and initialize firebase-functions-test. Since we are not passing in any parameters,
// it will be initialized in an "offline mode".
const test = require('firebase-functions-test')()

const onUpdateProposal = require('./onUpdateProposal')
const email = require('../email')

describe('onUpdateProposal', () => {
  const eventId = 'wpYPL2EC3WzxUqY77rQZ'
  const before = {
    abstract: 'hello',
    emailStatus: 'sending',
    id: 'iBTbrWOMWmsy85CNhkwF',
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    rating: null,
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    state: 'submitted',
    title: 'test',
    updateTimestamp: { _seconds: 1548233016, _nanoseconds: 957000000 },
  }
  const after = {
    abstract: 'hello',
    emailStatus: 'sent',
    id: 'iBTbrWOMWmsy85CNhkwF',
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    rating: null,
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    state: 'accepted',
    title: 'test',
    updateTimestamp: { _seconds: 1548233016, _nanoseconds: 957000000 },
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
  // mock updateProposal
  const docProposalStub = sinon.stub()
  const updateProposalStub = sinon.stub()
  // mock partialUpdateTalk
  const docTalkStub = sinon.stub()
  const updateTalkStub = sinon.stub()
  // mock snap.data()
  const snap = {
    before: { data: () => before },
    after: { data: () => after },
  }
  // mock email.send
  let emailSend
  let conf
  beforeEach(() => {
    conf = { mailgun: { domain: 'somedomain.org', key: 'SOME-SECRET' }, app: { gcf_url: 'https://somefirebase.url', url: 'https://somefirebase.url' } }
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
    // mock updateProposal
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(after.id).returns({ update: updateProposalStub })
    updateProposalStub.returns(() => {})
    // mock partialUpdateTalk
    collectionStub.withArgs('talks').returns({ doc: docTalkStub })
    docTalkStub.withArgs(after.id).returns({ set: updateTalkStub })
    updateTalkStub.returns(() => {})
    // mock send.Email
    emailSend = sinon.stub(email, 'send').callsFake(() => {})
  })
  afterEach(() => {
    sinon.reset()
    emailSend.restore()
  })

  it('should send email to speakers after submission is accepted', async () => {
    // given
    after.state = 'accepted'
    after.emailStatus = 'sending'
    // when
    const onUpdateProposalWrapped = test.wrap(onUpdateProposal)
    await onUpdateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: 'iBTbrWOMWmsy85CNhkwF' } })
    // then
    sinon.assert.match(emailSend.calledOnce, true)
    sinon.assert.calledWith(emailSend, sinon.match({
      domain: 'somedomain.org',
      key: 'SOME-SECRET',
    }), sinon.match({
      to: ['corinnekrych@gmail.com'],
      subject: '[RivieraDEV 2019] Talk accepted',
      html: sinon.match.any,
      confName: 'RivieraDEV 2019',
    }))
    sinon.assert.match(docUserStub.calledOnce, true)
    sinon.assert.match(updateProposalStub.calledOnce, true)
    sinon.assert.match(updateTalkStub.calledOnce, true)
  })

  it('should send email to speakers after submission is rejected', async () => {
    // given
    after.state = 'rejected'
    after.emailStatus = 'sending'
    // when
    const onUpdateProposalWrapped = test.wrap(onUpdateProposal)
    await onUpdateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: 'iBTbrWOMWmsy85CNhkwF' } })
    // then
    sinon.assert.match(emailSend.calledOnce, true)
    sinon.assert.calledWith(emailSend, sinon.match({
      domain: 'somedomain.org',
      key: 'SOME-SECRET',
    }), sinon.match({
      to: ['corinnekrych@gmail.com'],
      subject: '[RivieraDEV 2019] Talk declined',
      html: sinon.match.any,
      confName: 'RivieraDEV 2019',
    }))
    sinon.assert.match(docUserStub.calledOnce, true)
    sinon.assert.match(updateProposalStub.calledOnce, true)
    sinon.assert.match(updateTalkStub.calledOnce, true)
  })

  it('should NOT send email to speakers after submission is accepted but the email is already sent', async () => {
    // given
    before.state = 'accepted'
    before.emailStatus = 'sent'
    after.state = 'accepted'
    after.emailStatus = 'sent'
    // when
    const onUpdateProposalWrapped = test.wrap(onUpdateProposal)
    await onUpdateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: 'iBTbrWOMWmsy85CNhkwF' } })
    // then
    sinon.assert.match(emailSend.notCalled, true)
    sinon.assert.match(docUserStub.notCalled, true)
    sinon.assert.match(updateProposalStub.notCalled, true)
    sinon.assert.match(updateTalkStub.notCalled, true)
  })

  it('should NOT send email to speakers after submission is rejected but the email is already sent', async () => {
    // given
    before.state = 'rejected'
    before.emailStatus = 'sent'
    after.state = 'rejected'
    after.emailStatus = 'sent'
    // when
    const onUpdateProposalWrapped = test.wrap(onUpdateProposal)
    await onUpdateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: 'iBTbrWOMWmsy85CNhkwF' } })
    // then
    sinon.assert.match(emailSend.notCalled, true)
    sinon.assert.match(docUserStub.notCalled, true)
    sinon.assert.match(updateProposalStub.notCalled, true)
    sinon.assert.match(updateTalkStub.notCalled, true)
  })

  it('should NOT send email to speakers after submission is neither accepted nor rejected', async () => {
    // given
    before.state = 'somestate'
    before.emailStatus = 'sending'
    after.state = 'somestate'
    after.emailStatus = 'sending'
    // when
    const onUpdateProposalWrapped = test.wrap(onUpdateProposal)
    await onUpdateProposalWrapped(snap, { params: { eventId: 'wpYPL2EC3WzxUqY77rQZ', proposalId: 'iBTbrWOMWmsy85CNhkwF' } })
    // then
    sinon.assert.match(emailSend.notCalled, true)
    sinon.assert.match(docUserStub.notCalled, true)
    sinon.assert.match(updateProposalStub.notCalled, true)
    sinon.assert.match(updateTalkStub.notCalled, true)
  })
})
