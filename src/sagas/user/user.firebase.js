import firebase from 'firebase/app'

const DOCUMENT = 'users'

export const createUser = ({ uid, ...user }) =>
  firebase
    .firestore()
    .collection(DOCUMENT)
    .doc(uid)
    .set({
      ...user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

export const updateUser = ({ uid, ...user }) =>
  firebase
    .firestore()
    .collection(DOCUMENT)
    .doc(uid)
    .update(user)

export const fetchUser = uid =>
  firebase
    .firestore()
    .collection(DOCUMENT)
    .doc(uid)
    .get()
