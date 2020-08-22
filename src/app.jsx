import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { provider } from '@k-ramel/react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import withTheme from 'styles/themes/withTheme'

import { AuthProvider } from './features/auth'
import Home from './features/home'
import Login from './features/auth/login'
import BetaAccess from './features/beta/betaAccess'
import PrivateRoute from './features/router/PrivateRoute'
import Speaker from './features/speaker'
import Organizer from './features/organizer'

import store from './store'

import './styles'

const App = ({ className }) => (
  <div className={cn('app', className)}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beta-access" element={<BetaAccess />} />
          <PrivateRoute path="/speaker" element={<Speaker />} />
          <PrivateRoute path="/organizer" element={<Organizer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </div>
)

App.propTypes = {
  className: PropTypes.string,
}

App.defaultProps = {
  className: 'default-theme',
}

export default provider(store)(withTheme(App))
