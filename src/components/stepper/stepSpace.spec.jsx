/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import StepSpace from './stepSpace'

describe('components/stepSpace', () => {
  it('should render when step is current', () => {
    const wrapper = shallow(<StepSpace step={0} current={0} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render when current is one before step', () => {
    const wrapper = shallow(<StepSpace step={10} current={9} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render when current is lower than step', () => {
    const wrapper = shallow(<StepSpace step={10} current={1} />)
    expect(wrapper).toMatchSnapshot()
  })
})
