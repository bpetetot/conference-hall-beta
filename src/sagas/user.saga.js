import { takeEvery, call } from 'redux-saga/effects'

import store from 'redux/store'
import userCrud from 'firebase/user'

function* fetchUser(uid) {
  // check if user exists in the store
  const userExists = store.data.users.get(uid) || {}
  if (userExists) return
  // fetch user in database
  const ref = yield call(userCrud.read, uid)
  // add it in the store
  if (ref.exists) {
    store.data.users.add(ref.data())
  }
}

export default function* eventSagas() {
  yield takeEvery('FETCH_USER', ({ payload }) => fetchUser(payload))
}
