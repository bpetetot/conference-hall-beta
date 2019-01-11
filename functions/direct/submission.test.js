/* eslint-disable no-undef */
const chai = require('chai')

const { assert } = chai
const sinon = require('sinon')
const admin = require('firebase-admin')
// Require and initialize firebase-functions-test. Since we are not passing in any parameters,
// it will be initialized in an "offline mode".
const test = require('firebase-functions-test')()
const submission = require('./submission')

describe('Submit talk', () => {
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
  it('should add a proposal when the submitted talk hasn\'t been submitted already', async () => {
    // mock firestore DB
    const databaseStub = sinon.stub()
    const collectionStub = sinon.stub()
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    databaseStub.returns({ collection: collectionStub, FieldValue: { serverTimestamp: () => {} } })

    // mock getEvent
    const docStub = sinon.stub()
    const getEventStub = sinon.stub()
    const collectionProposalStub = sinon.stub()
    collectionStub.withArgs('events').returns({ doc: docStub })
    docStub.withArgs(eventId).returns({ get: getEventStub, collection: collectionProposalStub })
    getEventStub.returns(Promise.resolve({ data: () => event }))

    // mock updateTalk
    const talkDocStub = sinon.stub()
    const updateStub = sinon.stub()
    collectionStub.withArgs('talks').returns({ doc: talkDocStub })
    talkDocStub.withArgs(talk.id).returns({ update: updateStub })
    updateStub.returns(() => {})

    // mock addProposal
    const proposalStub = sinon.stub()
    const setStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: proposalStub })
    proposalStub.withArgs(talk.id).returns({ set: setStub })
    setStub.returns(() => {})

    const submitTalkWrapped = test.wrap(submission.submitTalk)
    await submitTalkWrapped({ eventId, talk })
    assert.isTrue(docStub.calledTwice)
    assert.isTrue(updateStub.calledOnce)
  })
  it('should update a proposal when this talk has already been submitted', async () => {
    // talk already has submission for this event
    talk.submissions = submissionsObject
    // mock firestore DB
    const databaseStub = sinon.stub()
    const collectionStub = sinon.stub()
    Object.defineProperty(admin, 'firestore', { get: () => databaseStub, configurable: true })
    databaseStub.returns({ collection: collectionStub, FieldValue: { serverTimestamp: () => {} } })

    // mock getEvent
    const docStub = sinon.stub()
    const getEventStub = sinon.stub()
    const collectionProposalStub = sinon.stub()
    collectionStub.withArgs('events').returns({ doc: docStub })
    docStub.withArgs(eventId).returns({ get: getEventStub, collection: collectionProposalStub })
    getEventStub.returns(Promise.resolve({ data: () => event }))

    // mock updateTalk
    const talkDocStub = sinon.stub()
    const updateStub = sinon.stub()
    collectionStub.withArgs('talks').returns({ doc: talkDocStub })
    talkDocStub.withArgs(talk.id).returns({ update: updateStub })
    updateStub.returns(() => {})

    // mock updateProposal
    const proposalStub = sinon.stub()
    const updateProposalStub = sinon.stub()
    collectionProposalStub.withArgs('proposals').returns({ doc: proposalStub })
    proposalStub.withArgs(talk.id).returns({ update: updateProposalStub })
    updateProposalStub.returns(() => {})

    const submitTalkWrapped = test.wrap(submission.submitTalk)
    await submitTalkWrapped({ eventId, talk })
    assert.isTrue(docStub.calledTwice)
    assert.isTrue(updateStub.calledOnce)
  })
})
