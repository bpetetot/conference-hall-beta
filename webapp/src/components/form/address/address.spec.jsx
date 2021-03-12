/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import AddressInput from './index.js'

describe('components/address', () => {
  // skip due to shallow rendering of enzyme doesn't works with hooks
  it.skip('should render with children', () => {
    expect(shallow(<AddressInput value="value" onChange={() => {}} />)).toMatchSnapshot()
  })
})
