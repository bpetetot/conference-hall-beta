import React from 'react'
import cn from 'classnames'
import { Routes, Route } from 'react-router-dom'
import { provider } from '@k-ramel/react'

import useTheme from 'styles/themes/useTheme'

import { AuthProvider } from './features/auth'
import Home from './features/home'
import Login from './features/auth/login'
import Beta from './features/beta/Beta'
import PrivateRoute from './features/router/PrivateRoute'
import Speaker from './features/speaker'
import Organizer from './features/organizer'

import store from './store'

import './styles'

const App = () => {
  const theme = useTheme()
  return (
    <div className={cn('app', theme)}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beta" element={<Beta />} />
          <PrivateRoute path="/speaker" element={<Speaker />} />
          <PrivateRoute path="/organizer" element={<Organizer />} betaAccess />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default provider(store)(App)
