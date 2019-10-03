/* eslint-env jest */
import React from 'react'
import { mount } from 'enzyme'
import Thread from './index'

jest.mock('date-fns/distance_in_words_to_now', () => () => 'about 1 year ago')

describe('components/thread', () => {
  it('should render a message in the thread', () => {
    const messages = [
      {
        id: 'message1',
        name: 'Luke Skywalker',
        message: 'May the force be with you',
        date: new Date(0),
        img: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
        onSave: () => {},
        allowEdit: false,
      },
    ]
    const mock = jest.fn()
    const wrapper = mount(<Thread
      currentUser="Yoda"
      messages={messages}
      onSaveMessage={mock}
      onDeleteMessage={mock}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})
