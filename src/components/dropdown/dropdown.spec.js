/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { mount } from 'enzyme'
import snap from 'tests/snapshot'
import Dropdown from './index.js'

const snapshot = (props) => snap(Dropdown)({ ...props })

describe('components/dropdown', () => {
  it('should render with props', snapshot({ action: 'a', children: 'c' }))
  it('should display the menu when clicked', () => {
    // mouting
    const wrapper = mount(<Dropdown action="action">Element</Dropdown>)
    // action
    expect(wrapper.find('.dropdown-menu').exists()).toBeFalsy()
    wrapper.find('.dropdown').simulate('click')
    expect(wrapper.find('.dropdown-menu').exists()).toBeTruthy()
  })
  it('should hide when clicked outside', () => {
    // register listeners
    const map = {}
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })
    // mouting
    const wrapper = mount(
      <div>
        <div className="boo" />
        <Dropdown action="action">Element</Dropdown>
      </div>,
    )
    // action
    expect(wrapper.find(Dropdown).instance().state).toEqual({
      visible: false,
    })
    wrapper.find('.dropdown').simulate('click')
    expect(wrapper.find(Dropdown).instance().state).toEqual({
      visible: true,
    })
    const boo = wrapper.find('.boo')
    map.mousedown(boo)
    expect(wrapper.find(Dropdown).instance().state).toEqual({
      visible: false,
    })
  })
  it('should remove listener after unmounting', () => {
    // register listeners
    let map = {}
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })
    document.removeEventListener = jest.fn(() => {
      map = {}
    })
    // mouting
    const wrapper = mount(<Dropdown action="action">Element</Dropdown>)
    // action
    expect(map).toMatchSnapshot()
    wrapper.unmount()
    expect(map).toMatchSnapshot()
  })
})
