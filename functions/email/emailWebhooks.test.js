/* eslint-disable no-undef */
const sinon = require('sinon')
const admin = require('firebase-admin')
const emailWebhook = require('./emailWebhooks')

describe('EmailWebhook', () => {
  const eventId = 'wpYPL2EC3WzxUqY77rQZ'
  const talkId = 'sVZIvr2qrEUvni64Oabo'
  const talk = {
    abstract: 'abstract',
    id: talkId,
    owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
    speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
    title: 'title',
  }

  // mock DB
  const databaseStub = sinon.stub()
  const collectionStub = sinon.stub()
  const fieldValueStub = sinon.stub()
  const timestampStub = sinon.stub()
  // mock event queries
  const docEventStub = sinon.stub()
  const collectionProposalStub = sinon.stub()
  // mock updateProposal
  const docProposalStub = sinon.stub()

  beforeEach(() => {
    // mock firestore DB static methods
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    Object.defineProperty(admin.firestore, 'FieldValue', { get: () => fieldValueStub, configurable: true })
    Object.defineProperty(admin.firestore.FieldValue, 'serverTimestamp', { get: () => timestampStub, configurable: true })
    databaseStub.returns({ collection: collectionStub })
    // mock getEvent
    collectionStub.withArgs('events').returns({ doc: docEventStub })
    docEventStub.withArgs(eventId).returns({
      collection: collectionProposalStub,
    })
  })
  afterEach(() => {
    sinon.reset()
  })

  it('should update proposal with delivered status when webhook is called with talkId', async () => {
    // Given
    const setProposalStub = sinon.stub()
    const updateProposalStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(talkId).returns(
      {
        set: setProposalStub,
        get: () => Promise.resolve({ data: () => talk }),
        update: updateProposalStub,
      },
    )
    setProposalStub.returns(() => {})
    const req = { body: { 'event-data': { 'user-variables': { talkId, eventId } } } }
    const res = {
      json: (resp) => {
        sinon.assert.match(resp.result, 'talk with Id: sVZIvr2qrEUvni64Oabo marked as email delivered.')
        // proposal should have been updated
        sinon.assert.match(updateProposalStub.calledOnce, true)
      },
    }
    // When
    await emailWebhook.delivered(req, res)
  })
})
