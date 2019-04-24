/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import Field from './index.js'

describe('components/field', () => {
  it('should render', () => {
    expect(shallow(<Field name="name" label="label" />)).toMatchSnapshot()
  })
})
