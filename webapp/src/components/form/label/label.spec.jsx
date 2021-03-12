/* eslint-env jest */
import React from 'react'
import Label from './index'

const props = {
  label: 'label',
  name: 'name',
  error: 'error',
  className: 'blue',
  classNameInput: 'red',
}

describe('components/label', () => {
  it('should render', () => {
    expect(<Label {...props}>children</Label>).toMatchSnapshot()
  })
})
