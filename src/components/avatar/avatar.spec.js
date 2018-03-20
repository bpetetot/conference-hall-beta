/* eslint-env jest */
import snap from 'tests/snapshot'
import Avatar from './index.js'

const snapshot = props => snap(Avatar)({ ...props })

describe('components/avatar', () => {
  it('should not render when no props', snapshot({}))
  it('should render with initial when no photo', snapshot({ displayName: 'Benjamin' }))
  it('should render with photo', snapshot({ displayName: 'Benjamin', photoURL: 'https://p.url' }))
})
