/* eslint-disable no-undef */
const sinon = require('sinon')
const admin = require('firebase-admin')
// Require and initialize firebase-functions-test. Since we are not passing in any parameters,
// it will be initialized in an "offline mode".
const test = require('firebase-functions-test')()

const onUpdateTalk = require('./onUpdateTalk')
const email = require('../email')

describe('onUpdateTalk', () => {
  const eventId = 'wpYPL2EC3WzxUqY77rQZ'
  const before = {
    abstract: 'hello',
    id: 'UBn4GkHAmPq95iQXGPVm',
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    submissions: {
      wpYPL2EC3WzxUqY77rQZ: {
        abstract: 'content',
        id: 'UBn4GkHAmPq95iQXGPVm',
        owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
        speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
        state: 'accepted',
        title: 'test',
      },
    },
    title: 'test',
  }
  const after = {
    abstract: 'hello',
    id: 'UBn4GkHAmPq95iQXGPVm',
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    submissions: {
      wpYPL2EC3WzxUqY77rQZ: {
        abstract: 'content',
        id: 'UBn4GkHAmPq95iQXGPVm',
        owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
        speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
        state: 'confirmed',
        title: 'test',
      },
    },
    title: 'test',
  }
  const event = {
    type: 'conference',
    surveyActive: false,
    cfpDates: { start: { toDate: () => {} }, end: { toDate: () => {} } },
    visibility: 'public',
    displayOrganizersRatings: false,
    organization: 'ITiFqPcDmgDBq0zju82p',
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
  // mock getOrganisationProposal
  const docOrganizationsStub = sinon.stub()
  // mock snap.data()
  const snap = {
    before: { data: () => before },
    after: { data: () => after },
  }
  // mock email.send
  let emailSend
  conf = { mailgun: { domain: 'somedomain.org', key: 'SOME-SECRET' }, app: { url: 'https://somefirebase.url' } }
  beforeEach(() => {
    sinon.reset()
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
    // mock updateProposal
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(after.id).returns({ update: updateProposalStub })
    updateProposalStub.returns(() => {})
    // mock getEventOrganizations
    collectionStub.withArgs('organizations').returns({ doc: docOrganizationsStub })
    docOrganizationsStub.withArgs(event.organization).returns({ get: () => new Promise(resolve => resolve({ data: () => ({ members: {} }) })) })
    // mock getUsers
    collectionStub.withArgs('users').returns({ doc: docUserStub, exists: true })
    docUserStub.withArgs('ibBeWNBzL3XVc0teerodftWdYzD2').returns({ get: () => new Promise(resolve => resolve({ data: () => user, exists: true })) })

    // mock send.Email
    emailSend = sinon.stub(email, 'send').callsFake(() => {})
  })
  afterEach(() => {
    sinon.reset()
    emailSend.restore()
  })

  it('should update talk/submission state after speaker confirms her venue', async () => {
    // given
    after.submissions[eventId].state = 'confirmed'
    // when
    const onUpdateTalkWrapped = test.wrap(onUpdateTalk)
    await onUpdateTalkWrapped(snap, { params: { talkId: 'UBn4GkHAmPq95iQXGPVm' } })
    // then
    sinon.assert.match(updateProposalStub.calledOnce, true)
    sinon.assert.match(getEventStub.called, true)
  })
})
