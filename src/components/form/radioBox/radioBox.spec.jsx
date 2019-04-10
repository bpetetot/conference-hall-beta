/* eslint-env jest */
import React from 'react'
import RadioBox from './index'

const props = {
  value: 'value',
  name: 'name',
}

describe('components/radiobox', () => {
  it('should render', () => {
    expect(<RadioBox {...props}>children</RadioBox>).toMatchSnapshot()
  })
})
