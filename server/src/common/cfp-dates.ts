function isConferenceOpened(start?: Date | null, end?: Date | null) {
  if (!start || !end) return false
  const today = new Date()
  return today >= start && today <= end
}

function isMeetupOpened(start?: Date | null) {
  if (!start) return false
  const today = new Date()
  return today >= start
}

export function isCfpOpened(type: string, start?: Date | null, end?: Date | null) {
  if (type === 'MEETUP') {
    return isMeetupOpened(start)
  }
  if (type === 'CONFERENCE') {
    return isConferenceOpened(start, end)
  }
  return false
}

export function isCfpFinished(end?: Date | null) {
  if (!end) return false
  const today = new Date()
  return today > end
}
