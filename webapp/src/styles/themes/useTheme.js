import { useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { isOrganizerApp, isSpeakerApp } from 'features/router/utils'

// TODO Add Unit Tests
function useTheme() {
  const { pathname } = useLocation()

  return classnames('default-theme', {
    'red-theme': isOrganizerApp(pathname),
    'blue-theme': isSpeakerApp(pathname),
  })
}

export default useTheme
