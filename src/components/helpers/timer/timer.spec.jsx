/* eslint-env jest */
import snap from 'tests/snapshot'
import { mount } from 'enzyme'
import React from 'react'
import Timer from './index'

const snapshot = props => snap(Timer)({ ...props })

describe('components/timer', () => {
  const props = {
    delay: 20,
    enabled: true,
    children: 'timer',
    onFinish: () => {},
  }
  it('should render with children', snapshot(props))
  it('should start when enable', () => {
    const wrapper = mount(<Timer {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
