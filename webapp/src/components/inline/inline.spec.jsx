/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Inline from './index'

describe('components/inline', () => {
  it('should render', () => {
    expect(
      shallow(
        <Inline className="proposal-subtitle" classNameItem="proposal-subtitle-item">
          {'speakerName'}
          {'categoryLabel'}
        </Inline>,
      ),
    ).toMatchSnapshot()
  })
})
