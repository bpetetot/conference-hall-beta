import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'
import compareDesc from 'date-fns/compare_desc'

import { getUserId } from 'redux/auth'
import { getRouterParam } from 'redux/router'
import talksData from 'redux/data/talks'
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

function* fetchTalk({ talkId }) {
  if (!talkId) return
  // check if already in the store
  const current = yield select(talksData.get(talkId))
  if (current && current.id === talkId) return
  // fetch talk from id
  const ref = yield call(talkCrud.read, talkId)
  if (ref.exists) {
    yield put(talksData.add({ talkId, ...ref.data() }))
  } else {
    yield put({ type: 'TALK_NOT_FOUND', payload: { talkId } })
  }
}

function* onLoadTalkPage() {
  // get talk id from router params
  const talkId = yield select(getRouterParam('talkId'))
  yield put({ type: 'FETCH_TALK', payload: { talkId } })
}

function* onLoadSpeakerTalks() {
  const uid = yield select(getUserId)
  const talks = yield call(fetchUserTalks, uid)
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
  yield takeLatest('ON_LOAD_TALK_PAGE', onLoadTalkPage)
  yield takeLatest('ON_LOAD_SPEAKER_TALK', onLoadSpeakerTalks)
  yield takeEvery('FETCH_TALK', ({ payload }) => fetchTalk(payload))
}
