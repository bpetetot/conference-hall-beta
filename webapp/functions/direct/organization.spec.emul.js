/* eslint-env jest */
const firebase = require('@firebase/testing')
const admin = require('firebase-admin')

const { leaveOrganization } = require('./organization')

function createOrganization({ organizationId, members }) {
  return admin
    .firestore()
    .collection('organizations')
    .doc(organizationId)
    .set({ members })
}

describe('createOrganization', () => {
  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
  })

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId: 'conference-hall' })
  })

  it('should remove the auth user from the organization', async () => {
    await createOrganization({
      organizationId: 'org1',
      members: {
        alice: 'owner',
        bob: 'member',
        tom: 'reviewer',
      },
    })
    await leaveOrganization({ organizationId: 'org1' }, { auth: { uid: 'bob' } })

    const organization = await admin
      .firestore()
      .collection('organizations')
      .doc('org1')
      .get()

    const { members } = await organization.data()
    expect(members).toEqual({ alice: 'owner', tom: 'reviewer' })
  })
})

jest.mock('firebase-admin')
jest.mock('firebase-functions')
