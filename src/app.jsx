import React from 'react'
import PropTypes from 'prop-types'

import withRoute from 'components/withRoute'
import Toaster from 'components/toaster'
import Home from './screens/home'
import Login from './screens/login'
import Organizer from './screens/organizer'

import './styles'

const App = ({ theme }) => (
  <div className={theme}>
    <Organizer forRoute="/organizer" />
    <Login forRoute="/login" />
    <Home forRoute="/" />
    <Toaster />
  </div>
)

App.propTypes = {
  theme: PropTypes.string,
}

App.defaultProps = {
  theme: 'default-theme',
}

export default withRoute(App)
