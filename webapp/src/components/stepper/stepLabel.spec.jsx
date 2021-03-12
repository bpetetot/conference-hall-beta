/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import StepLabel from './stepLabel'

describe('components/stepLabel', () => {
  it('should render', () => {
    const wrapper = shallow(<StepLabel label="boo" step={0} current={0} />)
    expect(wrapper).toMatchSnapshot()
  })
})
