import firebase from 'firebase/app'

export const isTimestamp = date => !!date && date instanceof firebase.firestore.Timestamp

export const toDate = (timestamp) => {
  if (isTimestamp(timestamp)) {
    return timestamp.toDate()
  }
  if (Number.isInteger(timestamp)) {
    return new Date(timestamp * 1000)
  }
  return timestamp
}
