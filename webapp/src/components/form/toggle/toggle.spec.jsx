/* eslint-env jest */
import React from 'react'
import Toggle from './index'

const props = {
  name: 'name',
  onChange: jest.fn(),
}

describe('components/toggle', () => {
  it('should render', () => {
    expect(<Toggle {...props} />).toMatchSnapshot()
  })
})
