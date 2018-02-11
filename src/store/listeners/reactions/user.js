/* eslint-disable import/prefer-default-export */
import { reaction } from 'k-ramel'
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
