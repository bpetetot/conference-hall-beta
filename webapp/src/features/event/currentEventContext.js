/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useMatch } from 'react-router-dom'
import { getTopRoute, isOrganizerApp } from 'features/router/utils'

const CurrentEventContext = React.createContext()

export const useCurrentEventId = () => useContext(CurrentEventContext)

function getEventIdFromLocalStorage() {
  const value = localStorage.getItem('currentEventId')
  if (!value || value === 'null') return null
  return value
}

const CurrentEventContextProvider = ({ children, loadEvent }) => {
  const [currentEventId, setCurrentEventId] = useState()

  const { pathname } = useLocation()
  const route = getTopRoute(pathname)
  const match = useMatch(`${route}/event/:eventId/*`)

  useEffect(() => {
    const routeEventId = match?.params?.eventId
    const localEventId = getEventIdFromLocalStorage()

    if (isOrganizerApp(pathname)) {
      if (currentEventId !== routeEventId) {
        setCurrentEventId(routeEventId)
      }
      return
    }

    const eventId = routeEventId || localEventId
    if (currentEventId !== eventId) {
      localStorage.setItem('currentEventId', eventId)
      setCurrentEventId(eventId)
      loadEvent(eventId)
    }
  }, [currentEventId, pathname, match, loadEvent])

  return (
    <CurrentEventContext.Provider value={currentEventId}>{children}</CurrentEventContext.Provider>
  )
}

CurrentEventContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
  loadEvent: PropTypes.func.isRequired,
}

export default CurrentEventContextProvider
