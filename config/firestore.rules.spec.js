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

function createOrganization(app, organizationId, uid) {
  return app
    .collection('organizations')
    .doc(organizationId)
    .set({ members: { [uid]: true } })
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
    await Promise.all(firebase.apps().map(app => app.delete()))
  })

  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId })
  })

  describe('Invites to a talk', () => {
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

    it("can list get invite for it's talk", async () => {
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

      await firebase.assertSucceeds(
        alice
          .collection('invites')
          .doc(id)
          .delete(),
      )
    })

    it("can't delete someone else invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })

      await createTalk(marie, 'talk1', 'marie')
      const { id } = await createInvite(marie, 'talk', 'talk1', 'marie')

      await firebase.assertFails(
        alice
          .collection('invites')
          .doc(id)
          .delete(),
      )
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

  describe('Invites to an organization', () => {
    it("can create an invite for it's organization", async () => {
      const alice = authedApp({ uid: 'alice' })

      await createOrganization(alice, 'organization1', 'alice')
      const invite = createInvite(alice, 'organization', 'organization1', 'alice')

      await firebase.assertSucceeds(invite)
    })

    it("can't create an invite for someone else organization", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })

      await createOrganization(marie, 'organization1', 'marie')
      const invite = createInvite(alice, 'organization', 'organization1', 'alice')

      await firebase.assertFails(invite)
    })

    it("can list get invite for it's organization", async () => {
      const alice = authedApp({ uid: 'alice' })

      await createOrganization(alice, 'organization1', 'alice')
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

      await createOrganization(marie, 'organization1', 'marie')
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

      await createOrganization(alice, 'organization1', 'alice')
      const { id } = await createInvite(alice, 'organization', 'organization1', 'alice')

      await firebase.assertSucceeds(
        alice
          .collection('invites')
          .doc(id)
          .delete(),
      )
    })

    it("can't delete someone else invite", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })

      await createOrganization(marie, 'organization1', 'marie')
      const { id } = await createInvite(marie, 'organization', 'organization1', 'marie')

      await firebase.assertFails(
        alice
          .collection('invites')
          .doc(id)
          .delete(),
      )
    })

    it("everybody can access invite by it's id", async () => {
      const alice = authedApp({ uid: 'alice' })
      const marie = authedApp({ uid: 'marie' })

      await createOrganization(marie, 'organization1', 'marie')
      const { id } = await createInvite(marie, 'organization', 'organization1', 'marie')
      const invite = alice.collection('invites').doc(id)

      await firebase.assertSucceeds(invite)
    })

    it('should be impossible to list all invites', async () => {
      const alice = authedApp({ uid: 'alice' })

      await createOrganization(alice, 'organization1', 'alice')
      await createInvite(alice, 'organization', 'organization1', 'alice')
      const invites = alice.collection('invites').get()

      await firebase.assertFails(invites)
    })
  })
})
