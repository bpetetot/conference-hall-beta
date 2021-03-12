/* eslint-env jest */
import snap from 'tests/snapshot'
import Badge from './index.js'

const snapshot = (props) => snap(Badge)({ ...props })

describe('components/badge', () => {
  it('should not render when no children', snapshot({}))
  it('should render with children', snapshot({ children: 'Benjamin', className: 'test' }))
})
