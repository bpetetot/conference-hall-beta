/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import PropTypes from 'prop-types'
import { inject } from '@k-ramel/react'
import LoadingIndicator from 'components/loader/loading'

export default (Component) => {
  class ProtectedComponent extends React.Component {
    static propTypes = {
      authenticated: PropTypes.bool.isRequired,
      initialized: PropTypes.bool.isRequired,
      userDataLoaded: PropTypes.bool.isRequired,
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
    return {
      ...auth,
      userDataLoaded: userLoaded && orgaLoaded,
      url: `${router.getCurrentRoute().href.base}`, // TODO ADD QUERY PARAMS ${store.getState().router.search}
      redirectLogin: url => router.replace(`/login?next=${url}`),
    }
  })(ProtectedComponent)
}
