/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMatch } from 'react-router-dom'

const CurrentEventContext = React.createContext()

export const useCurrentEventId = () => useContext(CurrentEventContext)

function getEventIdFromLocalStorage() {
  const value = localStorage.getItem('currentEventId')
  if (!value || value === 'null') return null
  return value
}

const CurrentEventProvider = ({ children }) => {
  const [currentEventId, setCurrentEventId] = useState()

  const match = useMatch('/speaker/event/:eventId/*')
  const routeEventId = match?.params?.eventId
  const localEventId = getEventIdFromLocalStorage()

  useEffect(() => {
    const eventId = routeEventId || localEventId
    if (currentEventId !== eventId) {
      localStorage.setItem('currentEventId', eventId)
      setCurrentEventId(eventId)
    }
  }, [currentEventId, routeEventId, localEventId])

  return (
    <CurrentEventContext.Provider value={currentEventId}>{children}</CurrentEventContext.Provider>
  )
}

CurrentEventProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default CurrentEventProvider
