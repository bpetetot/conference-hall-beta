import firebase from 'firebase/app'
import crud from './crud'

/**
 * Fetch user by email
 * @param {string} email user's email
 */
export const fetchUsersByEmail = async (email) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
  return result.docs.map(ref => ({ uid: ref.id, ...ref.data() }))
}

export default crud('users', 'uid')
