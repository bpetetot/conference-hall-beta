import { addDecorator, addParameters } from '@storybook/react'

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'styles'

import theme from './theme'

const history = createMemoryHistory()

export const decorators = [(story) => (
  <MemoryRouter history={history}>
    <div className="default-theme">{story()}</div>
  </MemoryRouter>
)]

export const parameters = {
  docs: {
    theme,
  },
  options: {
    storySort: {
      order: [
        'Documentation',
        ['Home', 'Install', 'Contributing', 'Changelog', 'Code of conduct', 'License'],
        'Components',
        'APIs',
      ],
    },
  },
}
