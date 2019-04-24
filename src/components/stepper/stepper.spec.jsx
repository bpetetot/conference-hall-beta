/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Stepper from './index.js'

describe('components/stepper', () => {
  it('should render', () => {
    const steps = [
      { label: 'Event selection', icon: 'fa fa-bars' },
      { label: 'Talk details', icon: 'fa fa-microphone' },
      { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
      { label: 'Done !', icon: 'fa fa-paper-plane' },
    ]
    const wrapper = shallow(<Stepper steps={steps} currentStep={0} />)
    expect(wrapper).toMatchSnapshot()
  })
})
