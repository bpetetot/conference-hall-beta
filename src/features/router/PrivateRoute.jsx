import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from 'features/auth'
import { Navigate, Route, useLocation } from 'react-router-dom'
import { LoadingIndicator } from 'components/loader'

const SKIP_BETA_ACCESS = false // process.env.NODE_ENV === 'development'

function PrivateRoute({ betaAccess, ...rest }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingIndicator className="login-loading" />
  }

  if (!user) {
    return <Navigate to={`/login?next=${location.pathname}`} replace />
  }

  if (betaAccess && !SKIP_BETA_ACCESS && !user.betaAccess) {
    return <Navigate to={`/beta?next=${location.pathname}`} replace />
  }

  return <Route {...rest} />
}

PrivateRoute.propTypes = {
  betaAccess: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  betaAccess: false,
}

export default PrivateRoute
