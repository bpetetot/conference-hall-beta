/* eslint-env jest */
const firebase = require('@firebase/testing')
const admin = require('firebase-admin')

const { validateInvite } = require('./invite')

function createInvite({ inviteId, entity, entityId }) {
  return admin
    .firestore()
    .collection('invites')
    .doc(inviteId)
    .set({ entity, entityId })
}

function createTalk({ talkId, uid }) {
  return admin
    .firestore()
    .collection('talks')
    .doc(talkId)
    .set({ speakers: { [uid]: true } })
}

function createOrganization({ organizationId, uid }) {
  return admin
    .firestore()
    .collection('organizations')
    .doc(organizationId)
    .set({ members: { [uid]: true } })
}

describe('validateInvite', () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
  })

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: 'conference-hall' })
  })

  it('should add user as speaker for the talk when validate invite', async () => {
    await createTalk({ talkId: 'talk1', uid: 'alice' })
    await createInvite({ inviteId: 'invite1', entity: 'talk', entityId: 'talk1' })
    await validateInvite({ inviteId: 'invite1' }, { auth: { uid: 'marie' } })

    const talk = await admin
      .firestore()
      .collection('talks')
      .doc('talk1')
      .get()

    await firebase.assertSucceeds(talk)

    const { speakers } = await talk.data()
    expect(speakers).toEqual({ alice: true, marie: true })
  })

  it('should add user as member of the organization when validate invite', async () => {
    await createOrganization({ organizationId: 'orga1', uid: 'alice' })
    await createInvite({ inviteId: 'invite1', entity: 'organization', entityId: 'orga1' })
    await validateInvite({ inviteId: 'invite1' }, { auth: { uid: 'marie' } })

    const organization = await admin
      .firestore()
      .collection('organizations')
      .doc('orga1')
      .get()

    await firebase.assertSucceeds(organization)

    const { members } = await organization.data()
    expect(members).toEqual({ alice: true, marie: true })
  })
})

jest.mock('firebase-admin')
jest.mock('firebase-functions')
