/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { replace } from 'redux-little-router'
import { inject } from 'k-ramel/react'

import { isAuthenticated, isInitialized } from '../auth.selectors'

export default (Component) => {
  class ProtectedComponent extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      initialized: PropTypes.bool.isRequired,
      redirectLogin: PropTypes.func.isRequired,
      url: PropTypes.string.isRequired,
    }

    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    checkAuth = () => {
      const {
        authenticated, initialized, redirectLogin, url,
      } = this.props
      if (initialized && !authenticated) {
        redirectLogin(url)
      }
    }

    render() {
      const { authenticated, ...rest } = this.props
      return authenticated ? <Component {...rest} /> : null
    }
  }

  return inject(store => ({
    authenticated: isAuthenticated(store.getState()),
    initialized: isInitialized(store.getState()),
    url: `${store.getState().router.pathname}${store.getState().router.search}`,
    redirectLogin: url => store.dispatch(replace(`/login?next=${url}`)),
  }))(ProtectedComponent)
}
