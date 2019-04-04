/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import InputButton from './index.js'

let onClick
let onChange
let props

describe('components/inputButton', () => {
  beforeEach(() => {
    onClick = jest.fn()
    onChange = jest.fn()
    props = { onClick, onChange, btnLabel: 'label' }
  })

  it('should render with required props', () => {
    expect(<InputButton {...props} />).toMatchSnapshot();
  })

  it('should render with enabled button when defaultValue provided', () => {
    const wrapper = shallow(<InputButton {...props} defaultValue="hello" />)
    expect(wrapper.find('Button[disabled=false]').length).toEqual(1)
    wrapper.find('Button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should render with disabled button when defaultValue is empty', () => {
    const wrapper = shallow(<InputButton {...props} defaultValue="" />)
    expect(wrapper.find('Button[disabled=true]').length).toEqual(1)
  })

  it('should handle return key as button click', () => {
    const wrapper = shallow(<InputButton {...props} defaultValue="" />)
    wrapper.find('input').simulate('keypress', { charCode: 'w' })
    expect(onClick).not.toHaveBeenCalled()
    wrapper.find('input').simulate('keypress', { charCode: 13 })
    expect(onClick).toHaveBeenCalled()
  })

  it('should handle onChange event', () => {
    const wrapper = shallow(<InputButton {...props} defaultValue="oldvalue" />)
    wrapper.find('input').simulate('change', { target: { value: 'newinput' } })
    expect(onChange).toHaveBeenCalled()
    expect(wrapper.state().value).toEqual('newinput')
  })
})
