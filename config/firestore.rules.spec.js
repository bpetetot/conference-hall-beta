/* eslint-env jest */
const firebase = require('@firebase/testing')
const path = require('path')
const fs = require('fs')

const projectId = 'conference-hall'

function authedApp(auth) {
  return firebase.initializeTestApp({ projectId, auth }).firestore()
}

function createTalk(app, talkId, uid) {
  return app
    .collection('talks')
    .doc(talkId)
    .set({ speakers: { [uid]: true } })
}

function createOrganization(app, organizationId, members) {
  return app.collection('organizations').doc(organizationId).set({ members })
}

function createInvite(app, entity, entityId, uid) {
  return app.collection('invites').add({
    entity,
    entityId,
    creator: uid,
  })
}

describe('Firestore rules', () => {
  beforeAll(async () => {
    const rulesPath = path.join(__dirname, 'firestore.rules')
    const rules = fs.readFileSync(rulesPath, 'utf8')
    await firebase.loadFirestoreRules({ projectId, rules })
  })

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId })
  })

  describe('Collection "organizations"', () => {
    it('can create an organization as owner', async () => {
      const alice = authedApp({ uid: 'alice' })
      const organization = createOrganization(alice, 'org1', { alice: 'owner' })
      await firebase.assertSucceeds(organization)
    })

    it("can't create an organization if not set as owner", async () => {
      const alice = authedApp({ uid: 'alice' })
      const organization = createOrganization(alice, 'org1', { alice: 'member' })
      await firebase.assertFails(organization)
    })

    it('can update an organization as owner', async () => {
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(alice, 'org1', { alice: 'owner' })
      const organization = alice.collection('organizations').doc('org1').set({ name: 'new name' })
      await firebase.assertSucceeds(organization)
    })

    it("can't update an organization if not owner", async () => {
      const alice = authedApp({ uid: 'alice' })
      const bob = authedApp({ uid: 'bob' })
      const tom = authedApp({ uid: 'tom' })
      await createOrganization(alice, 'org1', { alice: 'owner', bob: 'member', tom: 'reviewer' })
      const update1 = bob.collection('organizations').doc('org1').set({ name: 'new name' })
      await firebase.assertFails(update1)
      const update2 = tom.collection('organizations').doc('org1').set({ name: 'new name' })
      await firebase.assertFails(update2)
    })

    it('can get an organization if owner, member or reviewer', async () => {
      const alice = authedApp({ uid: 'alice' })
      const bob = authedApp({ uid: 'bob' })
      const tom = authedApp({ uid: 'tom' })
      await createOrganization(alice, 'org1', { alice: 'owner', bob: 'member', tom: 'reviewer' })
      const readByOwner = alice.collection('organizations').doc('org1').get()
      await firebase.assertSucceeds(readByOwner)
      const readByMember = bob.collection('organizations').doc('org1').get()
      await firebase.assertSucceeds(readByMember)
      const readByReviewer = tom.collection('organizations').doc('org1').get()
      await firebase.assertSucceeds(readByReviewer)
    })

    it("can't get an organization if don't belong to it", async () => {
      const alice = authedApp({ uid: 'alice' })
      const stranger = authedApp({ uid: 'stranger' })
      await createOrganization(alice, 'org1', { alice: 'owner' })
      const readByStranger = stranger.collection('organizations').doc('org1').get()
      await firebase.assertFails(readByStranger)
    })

    it('can list organizations as owner, member and reviewer', async () => {
      const alice = authedApp({ uid: 'alice' })
      const bob = authedApp({ uid: 'bob' })
      await createOrganization(alice, 'orgAsOwner', { alice: 'owner' })
      await createOrganization(bob, 'orgAsMember', { bob: 'owner', alice: 'member' })
      await createOrganization(bob, 'orgAsReviewer', { bob: 'owner', alice: 'reviewer' })
      await createOrganization(bob, 'NoOrg', { bob: 'owner' })
      const listOrgs = alice
        .collection('organizations')
        .where('members.alice', 'in', ['owner', 'member', 'reviewer'])
        .get()
      const result = await firebase.assertSucceeds(listOrgs)
      expect(result.docs.length).toEqual(3)
      expect(result.docs.map((org) => org.id)).toEqual([
        'orgAsMember',
        'orgAsOwner',
        'orgAsReviewer',
      ])
    })

    it("can't list organizations if no roles", async () => {
      const alice = authedApp({ uid: 'alice' })
      const bob = authedApp({ uid: 'bob' })
      await createOrganization(bob, 'NoOrg', { bob: 'owner' })
      const listOrgs = alice
        .collection('organizations')
        .where('members.alice', 'in', ['owner', 'member', 'reviewer'])
        .get()
      const result = await firebase.assertSucceeds(listOrgs)
      expect(result.docs.length).toEqual(0)
    })
  })

  describe('Collection "invites" - Invites to a talk', () => {
    it("can create an invite for it's talk", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createTalk(alice, 'talk1', 'alice')
      const invite = createInvite(alice, 'talk', 'talk1', 'alice')
      await firebase.assertSucceeds(invite)
    })

    it("can't create an invite for someone else talk", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createTalk(marie, 'talk1', 'marie')
      const invite = createInvite(alice, 'talk', 'talk1', 'alice')
      await firebase.assertFails(invite)
    })

    it("can get invite for it's talk", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createTalk(alice, 'talk1', 'alice')
      await createInvite(alice, 'talk', 'talk1', 'alice')
      await firebase.assertSucceeds(
        alice
          .collection('invites')
          .where('entity', '==', 'talk')
          .where('entityId', '==', 'talk1')
          .get(),
      )
    })

    it("can't list get invite for someone else talk", async () => {
      const marie = authedApp({ uid: 'marie' })
      const alice = authedApp({ uid: 'alice' })
      await createTalk(marie, 'talk1', 'marie')
      await createInvite(marie, 'talk', 'talk1', 'marie')
      const invite = alice
        .collection('invites')
        .where('entity', '==', 'talk')
        .where('entityId', '==', 'talk1')
        .get()

      await firebase.assertFails(invite)
    })

    it("can delete it's invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createTalk(alice, 'talk1', 'alice')
      const { id } = await createInvite(alice, 'talk', 'talk1', 'alice')
      await firebase.assertSucceeds(alice.collection('invites').doc(id).delete())
    })

    it("can't delete someone else invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createTalk(marie, 'talk1', 'marie')
      const { id } = await createInvite(marie, 'talk', 'talk1', 'marie')
      await firebase.assertFails(alice.collection('invites').doc(id).delete())
    })

    it("everybody can access invite by it's id", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createTalk(marie, 'talk1', 'marie')
      const { id } = await createInvite(marie, 'talk', 'talk1', 'marie')
      const invite = alice.collection('invites').doc(id)
      await firebase.assertSucceeds(invite)
    })

    it('should be impossible to list all invites', async () => {
      const alice = authedApp({ uid: 'alice' })
      await createTalk(alice, 'talk1', 'alice')
      await createInvite(alice, 'talk', 'talk1', 'alice')
      const invites = alice.collection('invites').get()
      await firebase.assertFails(invites)
    })
  })

  describe('Collection "invites" - Invites to an organization', () => {
    it("can create an invite for it's organization", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(alice, 'organization1', { alice: 'owner' })
      const invite = createInvite(alice, 'organization', 'organization1', 'alice')
      await firebase.assertSucceeds(invite)
    })

    it("can't create an invite for someone else organization", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createOrganization(marie, 'organization1', { marie: 'owner' })
      const invite = createInvite(alice, 'organization', 'organization1', 'alice')
      await firebase.assertFails(invite)
    })

    it("can list get invite for it's organization", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(alice, 'organization1', { alice: 'owner' })
      await createInvite(alice, 'organization', 'organization1', 'alice')
      await firebase.assertSucceeds(
        alice
          .collection('invites')
          .where('entity', '==', 'organization')
          .where('entityId', '==', 'organization1')
          .get(),
      )
    })

    it("can't list get invite for someone else organization", async () => {
      const marie = authedApp({ uid: 'marie' })
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(marie, 'organization1', { marie: 'owner' })
      await createInvite(marie, 'organization', 'organization1', 'marie')
      const invite = alice
        .collection('invites')
        .where('entity', '==', 'organization')
        .where('entityId', '==', 'organization1')
        .get()
      await firebase.assertFails(invite)
    })

    it("can delete it's invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(alice, 'organization1', { alice: 'owner' })
      const { id } = await createInvite(alice, 'organization', 'organization1', 'alice')
      await firebase.assertSucceeds(alice.collection('invites').doc(id).delete())
    })

    it("can't delete someone else invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createOrganization(marie, 'organization1', { marie: 'owner' })
      const { id } = await createInvite(marie, 'organization', 'organization1', 'marie')
      await firebase.assertFails(alice.collection('invites').doc(id).delete())
    })

    it("everybody can access invite by it's id", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })
      await createOrganization(marie, 'organization1', { marie: 'owner' })
      const { id } = await createInvite(marie, 'organization', 'organization1', 'marie')
      const invite = alice.collection('invites').doc(id)
      await firebase.assertSucceeds(invite)
    })

    it('should be impossible to list all invites', async () => {
      const alice = authedApp({ uid: 'alice' })
      await createOrganization(alice, 'organization1', { alice: 'owner' })
      await createInvite(alice, 'organization', 'organization1', 'alice')
      const invites = alice.collection('invites').get()
      await firebase.assertFails(invites)
    })
  })
})
