import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'
import compareDesc from 'date-fns/compare_desc'

import { getRouterParam } from 'store/reducers/router'
import talkCrud, { fetchUserTalks } from 'firebase/talks'

export const createTalk = reaction(async (action, store, { form }) => {
  const createForm = form('talk-create')
  const talk = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create talk into database
  const ref = await createForm.asyncSubmit(talkCrud.create, { ...talk, speakers: { [uid]: true } })
  // go to talk page
  store.dispatch(push(`/speaker/talk/${ref.id}`))
})

export const updateTalk = reaction((action, store, { form }) => {
  const updateForm = form('talk-edit')
  const talk = updateForm.getFormValues()
  // create talk into database
  updateForm.asyncSubmit(talkCrud.update, talk)
  // update talk into data store
  store.data.talks.update(talk)
  // go to talk page
  store.dispatch(push(`/speaker/talk/${talk.id}`))
})

export const fetchTalk = reaction(async (action, store) => {
  const talkId = action.payload || getRouterParam('talkId')(store.getState())
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
