/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme/build'
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

  it('should handle return key as button click', () => {
    const wrapper = shallow(<DayPicker {...props} defaultValue="" />)
    wrapper.find('DatePicker').simulate('change', new Date(0))
    expect(onChange).toHaveBeenCalled()
    expect(wrapper.state().date).toEqual(new Date(0))
  })
})
