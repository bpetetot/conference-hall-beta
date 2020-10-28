import { configure, addDecorator, addParameters } from '@storybook/react'

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'styles'

import theme from './theme'

const history = createMemoryHistory()

addParameters({
  options: {
    theme,
  },
})

addDecorator((story) => (
  <MemoryRouter history={history}>
    <div className="default-theme">{story()}</div>
  </MemoryRouter>
))

configure(
  [
    require.context('../docs/app', false, /home\.story\.mdx$/),
    require.context('../docs/app', false, /install\.story\.mdx$/),
    require.context('../src', true, /\.story\.mdx$/),
    require.context('../docs', true, /\.story\.mdx$/),
  ],
  module,
)
