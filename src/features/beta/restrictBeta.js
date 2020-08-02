/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'
import { useAuth } from 'features/auth'

const SKIP_BETA_ACCESS = process.env.NODE_ENV === 'development'

export default (Component) => {
  const BetaRestricted = ({ redirectBetaAccess, ...rest }) => {
    const { user } = useAuth()
    const { betaAccess } = user

    useEffect(() => {
      if (SKIP_BETA_ACCESS) return
      if (!betaAccess) redirectBetaAccess()
    }, [betaAccess, redirectBetaAccess])

    return SKIP_BETA_ACCESS || betaAccess ? <Component {...rest} /> : null
  }

  BetaRestricted.propTypes = {
    redirectBetaAccess: PropTypes.func.isRequired,
  }

  return inject((store) => {
    return {
      redirectBetaAccess: () => {
        store.dispatch({ type: '@@router/REPLACE_WITH_NEXT_URL', payload: 'beta-access' })
      },
    }
  })(BetaRestricted)
}
