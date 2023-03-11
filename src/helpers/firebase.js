import firebase from 'firebase/compat/app'

import { formatDate } from './date'

export const isTimestamp = (date) => !!date && date instanceof firebase.firestore.Timestamp

export const toDate = (timestamp) => {
  if (isTimestamp(timestamp)) {
    return timestamp.toDate()
  }
  return timestamp
}

// eslint-disable-next-line max-len
export const formatTimestamp = (timestamp, size, timezone) =>
  formatDate(toDate(timestamp), size, timezone)
