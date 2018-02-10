import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { provider } from 'k-ramel/react'

import withTheme from 'styles/themes/withTheme'
import Toaster from 'components/toaster'
import NotFound from './screens/components/notFound'
import Conference from './screens/conference'
import Organizer from './screens/organizer'
import Speaker from './screens/speaker'

import store from './redux'

import './styles'

const App = ({ className }) => (
  <div className={cn('app', className)}>
    <Conference />
    <Organizer />
    <Speaker />
    <Toaster />
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
