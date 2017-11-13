import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'redux-little-router'

import Toaster from 'components/toaster'
import Home from './screens/home'
import Login from './screens/login'
import Organizer from './screens/organizer'

import './styles'

const App = ({ theme }) => (
  <Fragment forRoute="/">
    <div className={theme}>
      <Fragment forRoute="/organizer">
        <Organizer />
      </Fragment>
      <Fragment forRoute="/login">
        <Login />
      </Fragment>
      <Fragment forRoute="/">
        <Home />
      </Fragment>
      <Toaster />
    </div>
  </Fragment>
)

App.propTypes = {
  theme: PropTypes.string,
}

App.defaultProps = {
  theme: 'default-theme',
}

export default App
