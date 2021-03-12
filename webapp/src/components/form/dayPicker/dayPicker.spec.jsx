/* eslint-env jest */
import React from 'react'
import { DayPicker } from './dayPicker'

let onChange
let props

describe('components/dayPicker', () => {
  beforeEach(() => {
    onChange = jest.fn()
    props = {
      id: '1',
      value: '',
      isMobile: false,
      isTablet: true,
      onChange,
    }
  })

  it('should render', () => {
    expect(<DayPicker {...props} />).toMatchSnapshot()
  })
})
