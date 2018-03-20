import { reaction } from 'k-ramel'
import { set, unset } from 'immutadot'

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

const getUser = uid => async (store) => {
  let user = store.data.users.get(uid)
  if (!user) {
    const ref = await userCrud.read(uid)
    user = ref.data()
    store.data.users.add(user)
  }
  return user
}

export const addOrganizationToUser = reaction(async (action, store) => {
  const { uid, organizationId } = action.payload
  const user = getUser(uid)(store)

  const updated = set(user, `organizations.${organizationId}`, true)

  store.data.users.update(updated)
  userCrud.update(updated)
})

export const removeOrganizationToUser = reaction(async (action, store) => {
  const { uid, organizationId } = action.payload
  const user = getUser(uid)(store)

  const updated = unset(user, `organizations.${organizationId}`)

  store.data.users.update(updated)
  userCrud.update(updated)
})
