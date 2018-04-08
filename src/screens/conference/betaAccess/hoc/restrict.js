/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'

export default (Component) => {
  class BetaRestricted extends React.Component {
    static propTypes = {
      organizerAccess: PropTypes.bool,
      redirectInviteCode: PropTypes.func.isRequired,
    }

    static defaultProps = {
      organizerAccess: undefined,
    }

    componentDidMount() {
      this.checkAccess()
    }

    componentDidUpdate() {
      this.checkAccess()
    }

    checkAccess = () => {
      const { organizerAccess, redirectInviteCode } = this.props
      if (!organizerAccess) {
        redirectInviteCode()
      }
    }

    render() {
      const { organizerAccess, ...rest } = this.props
      return !organizerAccess ? <Component {...rest} /> : null
    }
  }

  return inject((store, props, { router }) => {
    const { uid } = store.auth.get() || {}
    const { organizerAccess } = store.data.users.get(uid) || {}
    return {
      organizerAccess,
      redirectInviteCode: () => router.replace('/beta-access'),
    }
  })(BetaRestricted)
}
