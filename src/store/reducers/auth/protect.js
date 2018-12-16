/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import { inject } from '@k-ramel/react'
import LoadingIndicator from 'components/loader/loading'

export default (Component) => {
  class ProtectedComponent extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      initialized: PropTypes.bool.isRequired,
      userDataLoaded: PropTypes.bool.isRequired,
      redirectLogin: PropTypes.func.isRequired,
    }

    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    checkAuth = () => {
      const {
        authenticated, initialized, redirectLogin,
      } = this.props
      if (initialized && !authenticated) {
        redirectLogin()
      }
    }

    render() {
      const { authenticated, userDataLoaded, ...rest } = this.props
      if (!authenticated) return null
      if (!userDataLoaded) return <LoadingIndicator />
      return <Component {...rest} />
    }
  }

  return inject((store, props, { router }) => {
    const auth = store.auth.get()
    const userLoaded = store.data.users.hasKey(auth.uid)
    const orgaLoaded = store.data.organizations.isInitialized()

    const nextRoute = { next: router.getCurrentCode() }
    if (!isEmpty(router.getPathParams())) {
      nextRoute.params = JSON.stringify(router.getPathParams())
    }
    if (!isEmpty(router.getQueryParams())) {
      nextRoute.query = JSON.stringify(router.getQueryParams())
    }

    return {
      ...auth,
      userDataLoaded: userLoaded && orgaLoaded,
      redirectLogin: () => router.replace('login', null, nextRoute),
    }
  })(ProtectedComponent)
}
