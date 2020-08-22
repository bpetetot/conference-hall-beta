import React from 'react'
import { useAuth } from 'features/auth'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { LoadingIndicator } from 'components/loader'

function PrivateRoute(props) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingIndicator className="login-loading" />
  }

  if (!user) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />
  }

  return <Route {...props} />
}

export default PrivateRoute
