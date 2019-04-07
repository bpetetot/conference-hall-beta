/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Step from './step'

describe('components/step', () => {
  it('should render', () => {
    const wrapper = shallow(<Step icon="fa-check" step={0} current={0} />)
    expect(wrapper).toMatchSnapshot()
  })
})
