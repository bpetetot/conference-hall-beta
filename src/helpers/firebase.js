import firebase from 'firebase/app'

import { lgf, mdf } from './date'

export const isTimestamp = date => !!date && date instanceof firebase.firestore.Timestamp

export const toDate = (timestamp) => {
  if (isTimestamp(timestamp)) {
    return timestamp.toDate()
  }
  return timestamp
}

export const formatTimestamp = (timestamp, format = 'large') => {
  switch (format) {
    case 'medium':
      return mdf(toDate(timestamp))
    case 'large':
    default:
      return lgf(toDate(timestamp))
  }
}
