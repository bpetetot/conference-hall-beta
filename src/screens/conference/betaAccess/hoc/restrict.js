/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

export default (Component) => {
  class BetaRestricted extends React.Component {
    static propTypes = {
      betaAccess: PropTypes.string,
      skipBetaAccess: PropTypes.bool.isRequired,
      redirectBetaAccessForm: PropTypes.func.isRequired,
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
      const { betaAccess, skipBetaAccess, redirectBetaAccessForm } = this.props
      if (skipBetaAccess) return
      if (!betaAccess) redirectBetaAccessForm()
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
      skipBetaAccess: process.env.NODE_ENV === 'development',
      redirectBetaAccessForm: () => router.replace('beta-access'),
    }
  })(BetaRestricted)
}
