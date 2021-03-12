/* eslint-env jest */
import React from 'react'
import snap from 'tests/snapshot'
import { shallow } from 'enzyme'
import Backdrop from './index.js'

const snapshot = (props) => snap(Backdrop)({ ...props })

describe('components/backdrop', () => {
  it('should render', snapshot({}))
  it('should call onClick by default', () => {
    const onclick = jest.fn()
    const wrapper = shallow(<Backdrop onClick={onclick} />)
    wrapper.find('.backdrop').simulate('click')
    expect(onclick).toHaveBeenCalled()
  })
  it('should not call onClick if not ', () => {
    const onclick = jest.fn()
    const wrapper = shallow(<Backdrop onClick={onclick} withClickOutside={false} />)
    wrapper.find('.backdrop').simulate('click')
    expect(onclick).not.toHaveBeenCalled()
  })
})
