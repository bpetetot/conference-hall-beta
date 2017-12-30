/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'

export const fetchUserTalks = uid =>
  firebase
    .firestore()
    .collection('talks')
    .where(`speakers.${uid}`, '==', true)
    .get()
