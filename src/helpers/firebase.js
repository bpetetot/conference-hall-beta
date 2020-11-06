import firebase from 'firebase/app'

import { formatDate } from './date'

export const isTimestamp = (date) => !!date && date instanceof firebase.firestore.Timestamp

export const toDate = (timestamp) => {
  if (isTimestamp(timestamp)) {
    return timestamp.toDate()
  }
  return timestamp
}

export const toStartEndDates = (dates) => {
  if (!dates) return undefined
  return {
    start: toDate(dates.start),
    end: toDate(dates.end),
  }
}

export const formatTimestamp = (timestamp, size, timezone) => {
  return formatDate(toDate(timestamp), size, timezone)
}
