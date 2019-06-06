/* eslint-env jest */
import React, { Fragment } from 'react'
import { shallow } from 'enzyme'
import Button from 'components/button'
import Alert from './index'

describe('components/alert', () => {
  it('should render with a title only', () => {
    const wrapper = shallow(<Alert title="boo" />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should render with type info icon', () => {
    const wrapper = shallow(<Alert title="boo" type="info" />)
    expect(wrapper.find('i.fa-info-circle').exists()).toBeTruthy()
  })
  it('should render with type info error', () => {
    const wrapper = shallow(<Alert title="boo" type="error" />)
    expect(wrapper.find('i.fa-exclamation-circle').exists()).toBeTruthy()
  })
  it('should render with type info warning', () => {
    const wrapper = shallow(<Alert title="boo" type="warning" />)
    expect(wrapper.find('i.fa-exclamation-triangle').exists()).toBeTruthy()
  })
  it('should render with type info sucess', () => {
    const wrapper = shallow(<Alert title="boo" type="success" />)
    expect(wrapper.find('i.fa-check-circle').exists()).toBeTruthy()
  })
  it('should render with action buttons', () => {
    const comp = () => (
      <Fragment>
        <Button primary>
          I confirm my venue
        </Button>
        <Button primary error>
          I cancel my venue
        </Button>
      </Fragment>
    )
    const wrapper = shallow(<Alert
      title="boo"
      actionButtons={comp}
    />)
    expect(wrapper).toMatchSnapshot()
  })
})
