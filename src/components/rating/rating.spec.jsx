/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Rating from './index.js'

describe('components/rating', () => {
  it('should render', () => {
    const onRate = jest.fn()
    const wrapper = shallow(<Rating
      rating={0}
      onRating={onRate}
    />)
    expect(wrapper.state('rating')).toEqual(0)
    expect(wrapper).toMatchSnapshot()
    wrapper.find('i.fa-heart-o').simulate('click')
    expect(onRate).toHaveBeenCalled()
  })
})
