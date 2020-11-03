/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useMatch } from 'react-router-dom'
import { getTopRoute, isOrganizerApp } from 'features/router/utils'
import { useEvent } from './useEvents'

const CurrentEventContext = React.createContext()

export const useCurrentEvent = () => useContext(CurrentEventContext)

function getEventIdFromLocalStorage() {
  const value = localStorage.getItem('currentEventId')
  if (!value || value === 'null') return null
  return value
}

// TODO Add Unit Tests
export const CurrentEventProvider = ({ children }) => {
  const [currentEventId, setCurrentEventId] = useState()
  const currentEvent = useEvent(currentEventId)

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
    }
  }, [currentEventId, pathname, match])

  return (
    <CurrentEventContext.Provider value={currentEvent}>{children}</CurrentEventContext.Provider>
  )
}

CurrentEventProvider.propTypes = {
  children: PropTypes.any.isRequired,
}
