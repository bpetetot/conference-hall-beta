import { reaction } from 'k-ramel'
import { set, unset, push, splice } from 'immutadot'
import isEmpty from 'lodash/isEmpty'

import userCrud, { fetchUsersByEmail } from 'firebase/user'

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
  const user = await getUser(uid)(store)

  const updated = set(user, `organizations.${organizationId}`, true)

  store.data.users.update(updated)
  await userCrud.update(updated)

  const organization = store.data.organizations.get(organizationId)
  store.data.organizations.update(push(organization, 'users', updated))
})

export const removeOrganizationToUser = reaction(async (action, store) => {
  const { uid, organizationId } = action.payload
  const user = await getUser(uid)(store)

  const updated = unset(user, `organizations.${organizationId}`)

  store.data.users.update(updated)
  await userCrud.update(updated)


  const organization = store.data.organizations.get(organizationId)
  const userIndex = organization.users.findIndex(u => u.uid === uid)
  store.data.organizations.update(splice(organization, 'users', userIndex, 1))
})

export const searchUserByEmail = reaction(async (action, store) => {
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
})
