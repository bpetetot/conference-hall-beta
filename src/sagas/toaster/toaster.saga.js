import { delay } from 'redux-saga'
import { takeEvery, put, call } from 'redux-saga/effects'

function* addToast(toast) {
  yield put({ type: 'ADD_TOAST', payload: toast })
  yield call(delay, 10000)
  yield put({ type: 'REMOVE_TOAST', payload: toast })
}

export default function* toastSagas() {
  yield takeEvery('TOAST', action => addToast(action.payload))
}
