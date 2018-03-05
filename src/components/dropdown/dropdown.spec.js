/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { mount } from 'enzyme'
import snap from 'tests/snapshot'
import Dropdown from './index.js'

const snapshot = props => snap(Dropdown)({ ...props })

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
    document.addEventListener = jest.genMockFn().mockImplementation((event, cb) => {
      map[event] = cb
    })
    // mouting
    const wrapper = mount(<Dropdown action="action">Element</Dropdown>)
    // action
    wrapper.find('.dropdown').simulate('click')
    expect(wrapper.state('visible')).toBeTruthy()
    map.mousedown({ target: 'outside' })
    expect(wrapper.state('visible')).toBeFalsy()
  })
  it('should remove listener after unmounting', () => {
    // register listeners
    let map = {}
    document.addEventListener = jest.genMockFn().mockImplementation((event, cb) => {
      map[event] = cb
    })
    document.removeEventListener = jest.genMockFn().mockImplementation(() => {
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
