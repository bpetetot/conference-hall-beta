import firebase from 'firebase/app'

export const isTimestamp = date => !!date && date instanceof firebase.firestore.Timestamp

export const toDate = (timestamp) => {
  if (isTimestamp(timestamp)) {
    return timestamp.toDate()
  }
  return timestamp
}
