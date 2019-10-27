import React from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Home from './home'
import Login from './login'
import Public from './public'
import BetaAccess from './betaAccess'

const Conference = () => (
  <>
    <Home />
    <Login />
    <Public />
    <BetaAccess />
  </>
)

export default forRoute('home')(Conference)
