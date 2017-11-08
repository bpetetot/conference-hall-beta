/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { replace } from 'redux-little-router'
import { connect } from 'react-redux'

import { isAuthenticated, isInitialized } from '../../redux/auth'

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

  const mapState = state => ({
    authenticated: isAuthenticated(state),
    initialized: isInitialized(state),
    url: state.router.pathname,
  })

  const mapDispatch = dispatch => ({
    redirectLogin: url => dispatch(replace(`/login?next=${url}`)),
  })

  return connect(mapState, mapDispatch)(ProtectedComponent)
}
