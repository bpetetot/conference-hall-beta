/* eslint-env jest */
import snap from 'tests/snapshot'
import NavBar from './index.js'

const snapshot = props => snap(NavBar)({ ...props })

describe('components/navbar', () => {
  it('should render', snapshot({ className: 'c', children: 'children' }))
})
