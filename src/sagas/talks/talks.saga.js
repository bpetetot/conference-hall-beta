import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push, replace } from 'redux-little-router'

import { getUserId } from 'redux/auth'
import talksData, { getTalkIdFromRouterParam } from 'redux/data/talks'
import speakerTalks from 'redux/ui/speaker/talks'

import talkCrud, { fetchUserTalks, saveTalkSubmission } from './talks.firebase'

function* createTalk(talk) {
  const FORM = 'talk-create'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // get user id
    const uid = yield select(getUserId)
    // create talk into database
    const ref = yield call(talkCrud.create, { ...talk, speakers: { [uid]: true } })
    // reset form
    yield put(reset(FORM))
    // set form submitted
    yield put(stopSubmit(FORM))
    // go to talk page
    yield put(push(`/speaker/talk/${ref.id}`))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

function* updateTalk(talk) {
  const FORM = 'talk-edit'
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // update talk into database
    yield call(talkCrud.update, talk)
    // update talk into data store
    yield put(talksData.update(talk))
    // set form submitted
    yield put(stopSubmit(FORM))
    // go to talk page
    yield put(push(`/speaker/talk/${talk.id}`))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

function* fetchTalk(id) {
  // check if already in the store
  const current = yield select(talksData.get(id))
  if (current && current.id === id) return
  // fetch talk from id
  const ref = yield call(talkCrud.read, id)
  if (ref.exists) {
    yield put(talksData.add({ id, ...ref.data() }))
  } else {
    yield put({ type: 'TALK_NOT_FOUND', payload: id })
  }
}

function* fetchTalkFromRouterParams() {
  // get talk id from router params
  const id = yield select(getTalkIdFromRouterParam)
  if (id) {
    yield fetchTalk(id)
  }
}

function* fetchSpeakerTalks() {
  const uid = yield select(getUserId)
  const talks = yield fetchUserTalks(uid)
  // set talks in the store
  yield put(talksData.set(talks))
  // set talks id to the speaker talk store
  yield put(speakerTalks.reset())
  yield put(speakerTalks.set(talks.map(({ id }) => ({ id }))))
}

function* submitTalkToEvent({ talkId, eventId, data }) {
  const FORM = 'submit-talk'
  const talk = yield select(talksData.get(talkId))
  try {
    // indicate start submitting form
    yield put(startSubmit(FORM))
    // submit talk
    yield call(saveTalkSubmission, talkId, eventId, data)
    yield put(talksData.update({ ...talk, submissions: { ...talk.submissions, [eventId]: data } }))
    // set form submitted
    yield put(stopSubmit(FORM))
    yield put(replace(`/speaker/talk/${talkId}/submitted`))
  } catch (error) {
    yield put(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
}

export default function* talksSagas() {
  yield takeLatest('SUBMIT_CREATE_TALK_FORM', ({ payload }) => createTalk(payload))
  yield takeLatest('SUBMIT_UPDATE_TALK_FORM', ({ payload }) => updateTalk(payload))
  yield takeLatest('FETCH_TALK', ({ payload }) => fetchTalk(payload))
  yield takeLatest('FETCH_TALK_FROM_ROUTER_PARAMS', fetchTalkFromRouterParams)
  yield takeLatest('FETCH_SPEAKER_TALKS', fetchSpeakerTalks)
  yield takeLatest('SUBMIT_TALK_TO_EVENT', ({ payload }) => submitTalkToEvent(payload))
}
