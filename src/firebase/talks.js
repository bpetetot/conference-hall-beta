import firebase from 'firebase/app'
import { talkConverter } from 'models/Talk'
import crud from './crud'

const talksCrud = crud('talks', 'id', talkConverter)

/**
 * Fetch all talks of a user
 * @param {string} uid user id
 */
export const fetchUserTalks = async (uid) => {
  const result = await firebase
    .firestore()
    .collection('talks')
    .where(`speakers.${uid}`, '==', true)
    .get()
  return result.docs.map((ref) => ({ id: ref.id, ...ref.data() }))
}

export default talksCrud
