/* eslint-env jest */
import React from 'react'
import snap from 'tests/snapshot'
import { mount } from 'enzyme'
import Button from 'components/button'
import ConfirmationPopin from './index.js'

const snapshot = props => snap(ConfirmationPopin)({ ...props })

describe('components/confirmationPopin', () => {
  it('should render', snapshot({}))
  it('should call onClick by default', () => {
    const wrapper = mount(<ConfirmationPopin
      title="Confirmation title"
      content="Can you confirm by clicking on OK, else click Cancel ?"
      withOk
      withCancel
      className="default-theme"
      renderTrigger={({ show }) => (
        <Button type="button" onClick={show}>
          Open Confirmation Popin
        </Button>
      )}
    />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.confirmation-actions').length).toEqual(0)
    wrapper.find('Button').simulate('click')
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.confirmation-actions').length).toEqual(1)
  })
})
