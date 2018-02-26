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

export const updateOrganizationToUser = reaction(async (action, store) => {
  const { uid, organizationId } = action.payload

  const ref = await userCrud.read(uid)
  const user = ref.data()

  let updated
  if (action.type === '@@ui/ADD_ORGANIZATION_TO_USER') {
    updated = set(user, `organizations.${organizationId}`, true)
  } else if (action.type === '@@ui/REMOVE_ORGANIZATION_TO_USER') {
    updated = unset(user, `organizations.${organizationId}`)
  }

  await userCrud.update(updated)
  store.data.users.update(updated)
})
