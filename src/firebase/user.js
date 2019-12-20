import firebase from 'firebase/app'
import crud from './crud'

const userCrud = crud('users', 'uid')

/**
 * Fetch user by email
 * @param {string} email user's email
 */
export const fetchUsersByEmail = async email => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
  return result.docs.map(ref => ({ uid: ref.id, ...ref.data() }))
}

export const fetchUsersList = async (userIds = []) => {
  return Promise.all(
    userIds.map(async uid => {
      const doc = await userCrud.read(uid)
      return doc.data()
    }),
  )
}

export default userCrud
