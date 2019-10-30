/* eslint-disable react/jsx-filename-extension */
/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import snap from 'tests/snapshot'

import Tooltip from './tooltip'

jest.mock(
  'popper.js',
  () => class {
    update = jest.fn(() => undefined)

    destroy = jest.fn(() => undefined)
  },
)

const snapshot = (props) => snap(Tooltip)({ tooltip: 'my content', children: <div>Wrapped</div>, ...props })

describe('tooltip', () => {
  it('should set tooltip content', snapshot({}))
  it('should display tooltip inline', snapshot({ inline: true }))
  it('should set placement "auto"', snapshot({ placement: 'auto' }))
  it('should set placement "top"', snapshot({ placement: 'top' }))
  it('should set placement "bottom"', snapshot({ placement: 'bottom' }))
  it('should set placement "left"', snapshot({ placement: 'left' }))
  it('should set placement "right"', snapshot({ placement: 'right' }))
  it('should display on hover', () => {
    const props = { tooltip: 'my content' }
    const component = (
      <Tooltip {...props}>
        <div>Wrapped</div>
      </Tooltip>
    )
    const wrapper = mount(component)

    wrapper.find('span').simulate('mouseEnter')
    expect(wrapper.state().opened).toBe(true)

    wrapper.find('span').simulate('mouseLeave')
    expect(wrapper.state().opened).toBe(false)
  })
  it('should update positions', () => {
    const props = { tooltip: 'my content' }
    const component = (
      <Tooltip {...props}>
        <div>Wrapped</div>
      </Tooltip>
    )
    const wrapper = mount(component)
    const inst = wrapper.instance()
    inst.updatePositions({
      styles: { position: 'absolute' },
      offsets: { arrow: { position: 'absolute' } },
      attributes: { 'x-placement': 'top' },
    })

    expect(wrapper.state()).toEqual({
      opened: false,
      popperStyle: { position: 'absolute' },
      arrowStyle: { position: 'absolute' },
      placement: 'top',
    })
  })
  it('should destroy popper on unmount', () => {
    const props = { tooltip: 'my content' }
    const component = (
      <Tooltip {...props}>
        <div>Wrapped</div>
      </Tooltip>
    )
    const wrapper = mount(component)
    const inst = wrapper.instance().popperInstance

    wrapper.unmount()

    expect(inst.destroy.mock.calls.length).toBe(1)
  })
})
