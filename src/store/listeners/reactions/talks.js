import { reaction } from 'k-ramel'
import isEmpty from 'lodash/isEmpty'
import compareDesc from 'date-fns/compare_desc'
import { set, unset } from 'immutadot'

import talkCrud, { fetchUserTalks } from 'firebase/talks'
import { fetchUsersByEmail } from 'firebase/user'

export const createTalk = reaction(async (action, store, { form, router }) => {
  const createForm = form('talk-create')
  const talk = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create talk into database
  const ref = await createForm.asyncSubmit(talkCrud.create, {
    ...talk,
    owner: uid,
    speakers: { [uid]: true },
  })
  // go to talk page
  router.push(`/speaker/talk/${ref.id}`)
})

export const updateTalk = reaction((action, store, { form, router }) => {
  const updateForm = form('talk-edit')
  const talk = updateForm.getFormValues()
  // create talk into database
  updateForm.asyncSubmit(talkCrud.update, talk)
  // update talk into data store
  store.data.talks.update(talk)
  // go to talk page
  router.push(`/speaker/talk/${talk.id}`)
})

export const fetchTalk = reaction(async (action, store, { router }) => {
  const talkId = action.payload || router.getRouteParam('talkId')
  if (!talkId) return
  // check if already in the store
  const current = store.data.talks.get(talkId)
  if (current && current.id === talkId) return
  // fetch talk from id
  const ref = await talkCrud.read(talkId)
  if (ref.exists) {
    store.data.talks.add({ id: talkId, ...ref.data() })
  }
})

export const fetchSpeakerTalks = reaction(async (action, store) => {
  const { uid } = store.auth.get()
  const talks = await fetchUserTalks(uid)
  // set talks in the store
  store.data.talks.set(talks)
  // set talks id to the speaker talk store
  const sorted = talks.sort((t1, t2) => compareDesc(t1.updateTimestamp, t2.updateTimestamp))
  store.ui.speaker.myTalks.reset()
  store.ui.speaker.myTalks.set(sorted)
})

export const searchSpeakerByEmail = reaction(async (action, store) => {
  const email = action.payload
  store.ui.speaker.speakerAddModal.set({ searching: true, email, speakers: [] })
  const users = await fetchUsersByEmail(email)
  if (!isEmpty(users)) {
    users.forEach(user => store.data.users.addOrUpdate(user))
    store.ui.speaker.speakerAddModal.update({
      searching: false,
      speakers: users.map(user => user.uid),
    })
  } else {
    store.ui.speaker.speakerAddModal.update({ searching: false })
  }
})

export const updateSpeakerToTalk = reaction(async (action, store) => {
  const { uid, talkId } = action.payload
  const talk = store.data.talks.get(talkId)
  if (talk) {
    let updated
    if (action.type === '@@ui/ADD_SPEAKER_TO_TALK') {
      updated = set(talk, `speakers.${uid}`, true)
    } else if (action.type === '@@ui/REMOVE_SPEAKER_TO_TALK') {
      updated = unset(talk, `speakers.${uid}`)
    }
    if (updated && Object.keys(updated.speakers).length > 0) {
      await talkCrud.update(updated)
      store.data.talks.update(updated)
    }
  }
})
