/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Thread from './index'

describe('components/stepSpace', () => {
  it('should render when step is current', () => {
    const messages = [
      {
        id: 'message1',
        name: 'Luke Skywalker',
        message: 'May the force be with you',
        date: new Date(0),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
      },
    ]
    const onAddMessage = jest.fn()
    const wrapper = mount(<Thread
      messages={messages}
      onAddMessage={onAddMessage}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})
