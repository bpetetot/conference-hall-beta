import { takeEvery, put } from 'redux-saga/effects'

function* onRouteChanged({ pathname, query }) {
  if (pathname === '/speaker' && query && query.event) {
    yield put({ type: 'FETCH_EVENT', payload: query.event })
  }
}

export default function* routerSaga() {
  yield takeEvery(['ROUTER_PUSH', 'ROUTER_POP', 'ROUTER_REPLACE'], ({ payload }) =>
    onRouteChanged(payload))
}
