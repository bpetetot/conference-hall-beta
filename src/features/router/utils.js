// TODO Add Unit Tests
export function isSpeakerApp(pathname) {
  return pathname?.startsWith('/speaker')
}

export function isOrganizerApp(pathname) {
  return pathname?.startsWith('/organizer')
}

export function getAppTitle(pathname) {
  if (isSpeakerApp(pathname)) {
    return 'Speaker Hall'
  }
  if (isOrganizerApp(pathname)) {
    return 'Organizer Hall'
  }
  return 'Conference Hall'
}

export function getTopRoute(pathname) {
  if (isSpeakerApp(pathname)) {
    return '/speaker'
  }
  if (isOrganizerApp(pathname)) {
    return '/organizer'
  }
  return 'public'
}
