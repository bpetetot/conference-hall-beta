/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { ListItem } from './index'

describe('components/listItem', () => {
  it('should render', () => {
    expect(
      shallow(
        <ListItem
          title="title"
          subtitle="subtitle"
          info="info"
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should render clickable if onSelect is provided', () => {
    const clickMock = jest.fn()
    const wrapper = shallow(
      <ListItem
        title="title"
        subtitle="subtitle"
        info="info"
        onSelect={clickMock}
      />,
    )
    expect(wrapper.find('.clickable').length).toEqual(1)
    wrapper.find('.clickable').simulate('click')
    expect(clickMock).toHaveBeenCalled()
    expect(wrapper).toMatchSnapshot()
  })
})
