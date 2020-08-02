/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

import { useAuth } from 'features/auth'
import { LoadingIndicator } from 'components/loader'

export default (Component) => {
  const ProtectedComponent = ({ redirectLogin, ...rest }) => {
    const { user, loading } = useAuth()

    useEffect(() => {
      if (!user && !loading) {
        redirectLogin()
      }
    }, [user, loading, redirectLogin])

    if (loading) {
      return <LoadingIndicator />
    }

    if (!user) {
      return null
    }

    return <Component userId={user.uid} {...rest} />
  }

  ProtectedComponent.propTypes = {
    redirectLogin: PropTypes.func.isRequired,
  }

  return inject((store) => {
    return {
      redirectLogin: () => {
        store.dispatch({ type: '@@router/REPLACE_WITH_NEXT_URL', payload: 'login' })
      },
    }
  })(ProtectedComponent)
}
