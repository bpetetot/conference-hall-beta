import React from 'react'
import cn from 'classnames'
import { Routes, Route } from 'react-router-dom'
import { provider } from '@k-ramel/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import useTheme from 'styles/themes/useTheme'
import store from 'store'
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

const App = () => {
  const theme = useTheme()
  return (
    <div className={cn('app', theme)}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider client={queryClient}>
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
        </AuthProvider>
      </QueryClientProvider>
    </div>
  )
}

export default provider(store)(App)
