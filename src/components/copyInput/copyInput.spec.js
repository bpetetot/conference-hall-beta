/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { mount } from 'enzyme'
import snap from 'tests/snapshot'
import CopyInput from './index.js'

const snapshot = props => snap(CopyInput)({ ...props })

describe('components/copyInput', () => {
  it('should render with all props', snapshot({ title: 't', value: 'v' }))
  it('should render without title', snapshot({ value: 'v' }))
  it('should render without props', snapshot({}))
  it('should copy the value in clipboard when button clicked', () => {
    // mock
    document.execCommand.mockReset()
    // mouting
    const wrapper = mount(<CopyInput value="to copy" />)
    // action
    wrapper.find('button').simulate('click')
    // assert
    expect(document.execCommand.mock.calls).toMatchSnapshot()
  })
})
