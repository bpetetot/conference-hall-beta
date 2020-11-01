import compareDesc from 'date-fns/compareDesc'
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
    .withConverter(talkConverter)
    .where(`speakers.${uid}`, '==', true)
    .get()

  return result.docs
    .map((ref) => ref.data())
    .sort((t1, t2) => compareDesc(t1.updateTimestamp, t2.updateTimestamp))
}

export default talksCrud
