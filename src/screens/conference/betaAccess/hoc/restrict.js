/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

import { redirectWithNextUrl } from 'store/drivers/router/redirect'

export default (Component) => {
  class BetaRestricted extends React.Component {
    static propTypes = {
      betaAccess: PropTypes.string,
      skipBetaAccess: PropTypes.bool.isRequired,
      redirectBetaAccess: PropTypes.func.isRequired,
    }

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
      return (skipBetaAccess || betaAccess) ? <Component {...rest} /> : null
    }
  }

  return inject((store, props, { router }) => {
    const { uid } = store.auth.get() || {}
    const { betaAccess } = store.data.users.get(uid) || {}

    return {
      betaAccess,
      skipBetaAccess: false, // process.env.NODE_ENV === 'development',
      redirectBetaAccess: () => redirectWithNextUrl('beta-access', router),
    }
  })(BetaRestricted)
}
