import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { provider } from '@k-ramel/react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import withTheme from 'styles/themes/withTheme'

import { AuthProvider } from './features/auth'
import Home from './screens/conference/home'
import Login from './screens/conference/login'
import BetaAccess from './screens/conference/betaAccess'

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
