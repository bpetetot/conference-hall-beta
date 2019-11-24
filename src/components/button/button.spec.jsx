/* eslint-env jest */
import snap from 'tests/snapshot'
import React from 'react'
import Button from './index.js'

const snapshot = props => snap(Button)({ ...props })

describe('components/button', () => {
  it(
    'should render with children',
    snapshot({
      href: 'someurl',
      children: 'Benjamin',
      className: 'test',
      secondary: true,
    }),
  )
  it(
    'should renter with function children',
    snapshot({
      children: () => <div>some content</div>,
      className: 'test',
      secondary: true,
    }),
  )
})
