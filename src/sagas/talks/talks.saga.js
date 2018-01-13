import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'
import compareDesc from 'date-fns/compare_desc'

import { getUserId } from 'redux/auth'
import talksData, { getTalkIdFromRouterParam } from 'redux/data/talks'
import speakerTalks from 'redux/ui/speaker/myTalks'

import talkCrud, { fetchUserTalks } from './talks.firebase'

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
  const sorted = talks.sort((t1, t2) => compareDesc(t1.updateTimestamp, t2.updateTimestamp))
  yield put(speakerTalks.reset())
  yield put(speakerTalks.set(sorted))
}

export default function* talksSagas() {
  yield takeLatest('SUBMIT_CREATE_TALK_FORM', ({ payload }) => createTalk(payload))
  yield takeLatest('SUBMIT_UPDATE_TALK_FORM', ({ payload }) => updateTalk(payload))
  yield takeEvery('FETCH_TALK', ({ payload }) => fetchTalk(payload))
  yield takeLatest('FETCH_TALK_FROM_ROUTER_PARAMS', fetchTalkFromRouterParams)
  yield takeLatest('FETCH_SPEAKER_TALKS', fetchSpeakerTalks)
}
