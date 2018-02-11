import { takeEvery, call } from 'redux-saga/effects'

import usersData from 'redux/data/users'
import userCrud from 'sagas/user/user.firebase'

function* fetchUser(uid) {
  // check if user exists in the store
  const userExists = usersData.get(uid)
  if (userExists) return
  // fetch user in database
  const ref = yield call(userCrud.read, uid)
  // add it in the store
  if (ref.exists) {
    usersData.add(ref.data())
  }
}

export default function* eventSagas() {
  yield takeEvery('FETCH_USER', ({ payload }) => fetchUser(payload))
}
