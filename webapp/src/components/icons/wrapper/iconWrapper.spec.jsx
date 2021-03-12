/* eslint-env jest */
import React from 'react'
import iconWrapper from './index'

describe('components/iconWrapper', () => {
  it('should render', () => {
    expect(<iconWrapper />).toMatchSnapshot()
  })
})
