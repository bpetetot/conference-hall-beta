/* eslint-disable react/jsx-filename-extension */
/* eslint-env jest */
import React from 'react'
import snap from 'tests/snapshot'

import Tooltip from './tooltip'

jest.mock(
  'popper.js',
  () =>
    class {
      update = jest.fn(() => undefined)

      destroy = jest.fn(() => undefined)
    },
)

const snapshot = (props) =>
  snap(Tooltip)({ tooltip: 'my content', children: <div>Wrapped</div>, ...props })

describe('tooltip', () => {
  it('should set tooltip content', snapshot({}))
  it('should display tooltip inline', snapshot({ inline: true }))
  it('should set placement "auto"', snapshot({ placement: 'auto' }))
  it('should set placement "top"', snapshot({ placement: 'top' }))
  it('should set placement "bottom"', snapshot({ placement: 'bottom' }))
  it('should set placement "left"', snapshot({ placement: 'left' }))
  it('should set placement "right"', snapshot({ placement: 'right' }))
})
