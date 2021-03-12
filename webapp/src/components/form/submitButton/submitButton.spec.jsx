/* eslint-env jest */
import React from 'react'
import SubmitButton from './index'

const props = {
  value: 'value',
  name: 'name',
}

describe('components/submitButton', () => {
  it('should render', () => {
    expect(
      <SubmitButton {...props}>
        <span>children</span>
      </SubmitButton>,
    ).toMatchSnapshot()
  })
})
