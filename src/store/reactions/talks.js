import { set, unset } from 'immutadot'
import talkCrud from 'firebase/talks'

export const updateTalkSubmissionState = (action, store) => {
  const { eventId, talkId, state } = action.payload
  const talk = store.data.talks.get(talkId)
  const updatedTalk = set(talk, `submissions[${eventId}].state`, state)
  talkCrud.update(updatedTalk)
  store.data.talks.update(updatedTalk)
}

export const updateSpeakerToTalk = async (action, store) => {
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
}
