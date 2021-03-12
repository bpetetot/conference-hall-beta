/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Checkbox from './index.js'

describe('components/checkbox', () => {
  it('should render with children', () => {
    expect(shallow(<Checkbox name="name" label="label" />)).toMatchSnapshot()
  })
})
