/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

export default (Component) => {
  class BetaRestricted extends React.Component {
    static propTypes = {
      betaAccess: PropTypes.bool,
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
      const { betaAccess, redirectBetaAccessForm } = this.props
      if (!betaAccess) {
        redirectBetaAccessForm()
      }
    }

    render() {
      const { betaAccess, ...rest } = this.props
      return !betaAccess ? <Component {...rest} /> : null
    }
  }

  return inject((store, props, { router }) => {
    const { uid } = store.auth.get() || {}
    const { betaAccess } = store.data.users.get(uid) || {}
    return {
      betaAccess,
      redirectBetaAccessForm: () => router.replace('/beta-access'),
    }
  })(BetaRestricted)
}
