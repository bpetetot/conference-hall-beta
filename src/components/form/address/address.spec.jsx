/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import AddressInput from './index.js'


describe('components/address', () => {
  it('should render with children', () => {
    expect(shallow(<AddressInput value="value" onChange={() => {}} />)).toMatchSnapshot()
  })
})
