/* eslint-env jest */
import { shallow } from 'enzyme'
import React from 'react'
import RenderRadio from './renderRadio'

describe('components/renderRadio', () => {
  it('should render', () => {
    const props = { input: { value: 'value', name: 'name' }, label: 'label' }
    const wrapper = shallow(<RenderRadio {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
