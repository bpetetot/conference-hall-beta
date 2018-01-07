import firebase from 'firebase/app'
import crud from 'sagas/firebase/crud'

export const fetchUserTalks = uid =>
  firebase
    .firestore()
    .collection('talks')
    .where(`speakers.${uid}`, '==', true)
    .get()

export default crud('talks', 'id')
