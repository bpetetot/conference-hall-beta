import { call, put, takeLatest, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import { getUserId } from 'redux/auth'
import talksData from 'redux/data/talks'
import speakerTalks from 'redux/ui/speaker/talks'

import talkCrud, { fetchUserTalks } from './talks.firebase'

function* createTalk(talk) {
  const CREATE_FORM = 'talk-create'
  try {
    // indicate start submitting form
    yield put(startSubmit(CREATE_FORM))
    // get user id
    const uid = yield select(getUserId)
    // create talk into database
    const ref = yield call(talkCrud.create, { ...talk, speakers: { [uid]: true } })
    // reset form
    yield put(reset(CREATE_FORM))
    // set form submitted
    yield put(stopSubmit(CREATE_FORM))
    // go to talk page
    yield put(push(`/speaker/talk/${ref.id}`))
  } catch (error) {
    yield put(stopSubmit(CREATE_FORM, { _error: error.message }))
    throw error
  }
}

function* updateTalk(talk) {
  const UPDATE_FORM = 'talk-edit'
  try {
    // indicate start submitting form
    yield put(startSubmit(UPDATE_FORM))
    // update talk into database
    yield call(talkCrud.update, talk)
    // update talk into data store
    yield put(talksData.update(talk))
    // set form submitted
    yield put(stopSubmit(UPDATE_FORM))
    // go to talk page
    yield put(push(`/speaker/talk/${talk.id}`))
  } catch (error) {
    yield put(stopSubmit(UPDATE_FORM, { _error: error.message }))
    throw error
  }
}

function* fetchTalk(id) {
  // check if already in the store
  const current = yield select(talksData.get(id))
  if (current && current.id === id) return
  // fetch event from id
  const ref = yield call(talkCrud.read, id)
  if (ref.exists) {
    yield put(talksData.add({ id, ...ref.data() }))
  } else {
    yield put({ type: 'TALK_NOT_FOUND', payload: id })
  }
}

function* fetchTalkFromRouterParams() {
  // get talk id from router params
  const { id } = yield select(state => state.router.params)
  if (id) {
    yield fetchTalk(id)
  }
}

function* fetchSpeakerTalks() {
  const uid = yield select(getUserId)
  const result = yield fetchUserTalks(uid)
  const talks = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set talks in the store
  yield put(talksData.set(talks))
  // set talks id to the speaker talk store
  yield put(speakerTalks.set(talks.map(({ id }) => ({ id }))))
}

export default function* talksSagas() {
  yield takeLatest('SUBMIT_CREATE_TALK_FORM', ({ payload }) => createTalk(payload))
  yield takeLatest('SUBMIT_UPDATE_TALK_FORM', ({ payload }) => updateTalk(payload))
  yield takeLatest('FETCH_TALK', ({ payload }) => fetchTalk(payload))
  yield takeLatest('FETCH_TALK_FROM_ROUTER_PARAMS', fetchTalkFromRouterParams)
  yield takeLatest('FETCH_SPEAKER_TALKS', fetchSpeakerTalks)
}
