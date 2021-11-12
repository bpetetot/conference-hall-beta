/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Snackbar from 'components/snackbar'

import styles from './notification.module.css'

const NotificationContext = React.createContext()

export const useNotification = () => useContext(NotificationContext)

// TODO Add Unit Tests
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)

  const reset = useCallback(() => setNotification(null), [])
  const sendError = useCallback((message) => setNotification({ type: 'error', message }), [])
  const sendSuccess = useCallback((message) => setNotification({ type: 'success', message }), [])
  const sendWarning = useCallback((message) => setNotification({ type: 'warning', message }), [])

  const value = useMemo(
    () => ({ sendError, sendSuccess, sendWarning }),
    [sendError, sendSuccess, sendWarning],
  )

  return (
    <NotificationContext.Provider value={value}>
      {notification && (
        <Snackbar
          className={styles.notification}
          defaultOpen
          content={notification.message}
          error={notification.type === 'error'}
          success={notification.type === 'success'}
          warning={notification.type === 'warning'}
          onClose={reset}
        />
      )}
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.any.isRequired,
}
