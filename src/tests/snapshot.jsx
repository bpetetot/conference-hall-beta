/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

const component = Component => props => renderer.create(<Component {...props} />)

export default (Component) => {
  const WrappedComponent = component(Component)

  return props => () => {
    const c = WrappedComponent(props)
    const tree = c.toJSON()
    expect(tree).toMatchSnapshot()
  }
}
