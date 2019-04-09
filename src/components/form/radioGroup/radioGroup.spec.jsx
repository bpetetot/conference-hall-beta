/* eslint-env jest */
import React from 'react'
import RadioGroup from './index'

const props = {
  value: 'value',
  name: 'name',
}

describe('components/radiogroup', () => {
  it('should render', () => {
    expect(<RadioGroup {...props}><span>child1</span><span>child2</span></RadioGroup>)
      .toMatchSnapshot()
  })
})
