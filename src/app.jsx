import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { provider } from '@k-ramel/react'

import withTheme from 'styles/themes/withTheme'
import NotFound from './screens/components/notFound'
import Homepage from './screens/homepage'
import Search from './screens/search'
import Login from './screens/login'
import BetaAccess from './screens/betaAccess'
import Public from './screens/public'
import Organizer from './screens/organizer'
import Speaker from './screens/speaker'

import store from './store'

import './styles'

const App = ({ className }) => (
  <div className={cn('app', className)}>
    <Homepage />
    <Search />
    <Login />
    <BetaAccess />
    <Public />
    <Organizer />
    <Speaker />
    <NotFound />
  </div>
)

App.propTypes = {
  className: PropTypes.string,
}

App.defaultProps = {
  className: 'default-theme',
}

export default provider(store)(withTheme(App))
