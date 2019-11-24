/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

export default Component => {
  class BetaRestricted extends React.Component {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
      betaAccess: PropTypes.string,
      skipBetaAccess: PropTypes.bool.isRequired,
      redirectBetaAccess: PropTypes.func.isRequired,
    }

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
      betaAccess: undefined,
    }

    componentDidMount() {
      this.checkAccess()
    }

    componentDidUpdate() {
      this.checkAccess()
    }

    checkAccess = () => {
      const { betaAccess, skipBetaAccess, redirectBetaAccess } = this.props
      if (skipBetaAccess) return
      if (!betaAccess) redirectBetaAccess()
    }

    render() {
      const { betaAccess, skipBetaAccess, ...rest } = this.props
      return skipBetaAccess || betaAccess ? <Component {...rest} /> : null
    }
  }

  return inject(store => {
    const { uid } = store.auth.get() || {}
    const { betaAccess } = store.data.users.get(uid) || {}

    return {
      betaAccess,
      skipBetaAccess: process.env.NODE_ENV === 'development',
      redirectBetaAccess: () =>
        store.dispatch({ type: '@@router/REPLACE_WITH_NEXT_URL', payload: 'beta-access' }),
    }
  })(BetaRestricted)
}
