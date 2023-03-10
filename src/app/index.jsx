import React from 'react'
import cn from 'classnames'
import { Routes, Route } from 'react-router-dom'
import { provider } from '@k-ramel/react'

import useTheme from 'styles/themes/useTheme'
import store from 'store'
import { CurrentEventProvider } from 'features/event/currentEventContext'
import { AuthProvider } from 'features/auth'
import PrivateRoute from 'features/router/PrivateRoute'
import Home from 'features/home'
import Login from 'features/auth/login'
import Beta from 'features/beta/Beta'
import Invite from 'features/invite'
import PageNotFound from 'features/router/notFound'
import Public from './public'
import Speaker from './speaker'
import Organizer from './organizer'

import 'styles'

function App() {
  const theme = useTheme()
  return (
    <div className={cn('app', theme)}>
      <AuthProvider>
        <CurrentEventProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/beta" element={<Beta />} />
            <Route path="/public/*" element={<Public />} />
            <PrivateRoute path="/speaker/*" element={<Speaker />} />
            <PrivateRoute path="/organizer/*" element={<Organizer />} betaAccess />
            <PrivateRoute path="/invite/:inviteId" element={<Invite />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CurrentEventProvider>
      </AuthProvider>
    </div>
  )
}

export default provider(store)(App)
