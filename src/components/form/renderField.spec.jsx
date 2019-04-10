/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import renderField from './renderField'

describe('components/renderField', () => {
  it('should render', () => {
    const MyInput = renderField('input')
    const wrapper = shallow(<MyInput meta={{ error: 'error' }} input={{ name: 'boo' }} type="radio" placholder="placeholder" />)
    expect(wrapper).toMatchSnapshot()
  })
})
