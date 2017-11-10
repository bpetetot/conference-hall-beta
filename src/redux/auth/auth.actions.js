import { push } from 'redux-little-router'

export const signin = (providerName, nextUrl = '/') => async (dispatch, getState, firebase) => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
    dispatch(push(nextUrl))
  } catch (error) {
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
    console.error(error)
  }
}

export const signout = () => async (dispatch, getState, firebase) => {
  try {
    await firebase.auth().signOut()
    dispatch(push('/'))
  } catch (error) {
    console.error(error)
  }
}
