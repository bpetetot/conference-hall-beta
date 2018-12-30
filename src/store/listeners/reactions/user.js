import isEmpty from 'lodash/isEmpty'

import userCrud, { fetchUsersByEmail } from 'firebase/user'

export const fetchUser = async (action, store) => {
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
}

export const saveProfile = async (action, store) => {
  const profile = action.payload

  store.ui.loaders.update({ isProfileSaving: true })
  await userCrud.update(profile)
  store.ui.loaders.update({ isProfileSaving: false })

  store.data.users.update(profile)
}

export const searchUserByEmail = async (action, store) => {
  const email = action.payload
  store.ui.userAddModal.set({ searching: true, email, users: [] })
  const users = await fetchUsersByEmail(email)
  if (!isEmpty(users)) {
    users.forEach(user => store.data.users.addOrUpdate(user))
    store.ui.userAddModal.update({
      searching: false,
      users: users.map(user => user.uid),
    })
  } else {
    store.ui.userAddModal.update({ searching: false })
  }
}
