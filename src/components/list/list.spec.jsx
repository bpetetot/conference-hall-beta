/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import { List } from './index'

describe('components/list', () => {
  it('should render an empty list with default no result', () => {
    expect(
      shallow(
        <List
          className="event-proposals"
          array={[]}
          renderRow={(proposal) => (
            <div>{proposal}</div>
          )}
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should render an empty list with custom empty', () => {
    expect(
      shallow(
        <List
          className="event-proposals"
          array={[]}
          noResult="😢"
          renderRow={(proposal) => (
            <div>{proposal}</div>
          )}
        />,
      ),
    ).toMatchSnapshot()
  })
  it('should render a non-empty list', () => {
    expect(
      shallow(
        <List
          className="event-proposals"
          array={['hello']}
          renderRow={(proposal) => (
            <div key={proposal}>{proposal}</div>
          )}
        />,
      ),
    ).toMatchSnapshot()
  })
})
