import { reaction } from 'k-ramel'
import { startSubmit, stopSubmit } from 'redux-form'

import userCrud from 'firebase/user'

export const fetchUser = reaction(async (action, store) => {
  // check if user exists in the store
  const uid = action.payload
  const userExists = store.data.users.get(uid)
  if (userExists) return
  // fetch user in database
  const userRef = await userCrud.read(uid)
  // add it in the store
  if (userRef.exists) {
    store.data.users.add(userRef.data())
  }
})

export const saveProfile = reaction(async (action, store) => {
  const FORM = 'user-profile'
  const profile = action.payload
  try {
    // indicate start submitting form
    store.dispatch(startSubmit(FORM))
    // update user data in database
    await userCrud.update(profile)
    // update user data in the store
    store.data.users.update(profile)
    // set form submitted
    store.dispatch(stopSubmit(FORM))
  } catch (error) {
    store.dispatch(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
})
