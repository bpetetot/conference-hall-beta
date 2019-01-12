/* eslint-disable no-undef */
const chai = require('chai')

const { assert } = chai
const sinon = require('sinon')
const admin = require('firebase-admin')
// Require and initialize firebase-functions-test. Since we are not passing in any parameters,
// it will be initialized in an "offline mode".
const test = require('firebase-functions-test')()
const submission = require('./submission')

describe('Submitssion', () => {
  const eventId = 'wpYPL2EC3WzxUqY77rQZ'
  const submissionsObject = {
    wpYPL2EC3WzxUqY77rQZ: {
      abstract: 'abstract',
      id: 'sVZIvr2qrEUvni64Oabo',
      owner: 'ibBeWNBzL3XVc0teerodftWdYzD2',
      speakers: { ibBeWNBzL3XVc0teerodftWdYzD2: true },
      title: 'title',
    },
  }
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
  // mock DB
  const databaseStub = sinon.stub()
  const collectionStub = sinon.stub()
  // mock event queries
  const docEventStub = sinon.stub()
  const getEventStub = sinon.stub()
  const collectionProposalStub = sinon.stub()
  // mock updateTalk
  const docTalkStub = sinon.stub()
  const updateTalkStub = sinon.stub()
  // mock updateProposal
  const docProposalStub = sinon.stub()

  beforeEach(() => {
    // mock firestore DB
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    databaseStub.returns({ collection: collectionStub, FieldValue: { serverTimestamp: () => {} } })
    // mock getEvent
    collectionStub.withArgs('events').returns({ doc: docEventStub })
    docEventStub.withArgs(eventId).returns({
      get: getEventStub,
      collection: collectionProposalStub,
    })
    getEventStub.returns(Promise.resolve({ data: () => event }))
    // mock updateTalk
    collectionStub.withArgs('talks').returns({ doc: docTalkStub })
    docTalkStub.withArgs(talk.id).returns({ update: updateTalkStub })
    updateTalkStub.returns(() => {})
  })
  afterEach(() => {
    sinon.reset()
  })

  it('should add a proposal when the submitted talk hasn\'t been submitted already', async () => {
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    // mock addProposal
    const setProposalStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(talk.id).returns({ set: setProposalStub })
    setProposalStub.returns(() => {})

    const submitTalkWrapped = test.wrap(submission.submitTalk)
    await submitTalkWrapped({ eventId, talk })
    assert.isTrue(docEventStub.calledTwice)
    assert.isTrue(updateTalkStub.calledOnce)
    assert.isTrue(setProposalStub.calledOnce)
  })

  it('should update a proposal when this talk has already been submitted', async () => {
    // talk already has submission for this event
    talk.submissions = submissionsObject
    // mock updateProposal
    const updateProposalStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(talk.id).returns({ update: updateProposalStub })
    updateProposalStub.returns(() => {})

    const submitTalkWrapped = test.wrap(submission.submitTalk)
    await submitTalkWrapped({ eventId, talk })
    assert.isTrue(docEventStub.calledTwice)
    assert.isTrue(updateTalkStub.calledOnce)
    assert.isTrue(updateProposalStub.called)
  })

  it('should remove a proposal when unsumit is called', async () => {
    // talk already has submission for this event
    talk.submissions = submissionsObject
    // mock deleteProposal
    const deleteProposalStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: docProposalStub })
    docProposalStub.withArgs(talk.id).returns({ delete: deleteProposalStub })
    deleteProposalStub.returns(() => {})

    const submitTalkWrapped = test.wrap(submission.unsubmitTalk)
    await submitTalkWrapped({ eventId, talk })
    assert.isTrue(docEventStub.calledTwice)
    assert.isTrue(updateTalkStub.calledOnce)
    assert.isTrue(deleteProposalStub.called)
  })
})
