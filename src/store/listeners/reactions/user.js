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

export const saveProfile = reaction((action, store, { form }) => {
  const profileForm = form('user-profile')
  const profile = profileForm.getFormValues()
  // update user data in database
  profileForm.asyncSubmit(userCrud.update, profile)
  // update user data in the store
  store.data.users.update(profile)
})
