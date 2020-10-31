import firebase from 'firebase/app'
import User, { userConverter } from 'models/User'
import crud from './crud'

const userCrud = crud('users', 'uid', userConverter)

/**
 * From user data authenticated, find the user in db or create it
 * @param {*} user data authenticated
 */
export const findOrCreateAuthUser = async ({ uid, displayName, photoUrl, email }) => {
  const user = await userCrud.read(uid)

  if (!user.exists) {
    const data = { uid, displayName, photoUrl, email }
    await userCrud.create(data)
    return new User(data)
  }
  return user.data()
}

/**
 * Update a user
 * @param {User} user user object
 * @param {*} updated user data to update
 */
export const updateAuthUser = async (user, data) => {
  const updated = new User({ ...user, ...data })
  await userCrud.update(updated)
  return updated
}

/**
 * Fetch user by email
 * @param {string} email user's email
 */
export const fetchUsersByEmail = async (email) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
  return result.docs.map((ref) => ({ uid: ref.id, ...ref.data() }))
}

export const fetchUsersList = async (userIds = []) => {
  return Promise.all(
    userIds.map(async (uid) => {
      const doc = await userCrud.read(uid)
      return doc.data()
    }),
  )
}

export default userCrud
