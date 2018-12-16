import React, { Fragment } from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Home from './home'
import Login from './login'
import Public from './public'
import BetaAccess from './betaAccess'

const Conference = () => (
  <Fragment>
    <Home />
    <Login />
    <Public />
    <BetaAccess />
  </Fragment>
)

export default forRoute('home')(Conference)
