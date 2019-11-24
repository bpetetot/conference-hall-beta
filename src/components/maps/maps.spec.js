/* eslint-env jest */
import snap from 'tests/snapshot'
import Maps from './index.js'

const snapshot = props => snap(Maps)({ ...props })

describe('components/maps', () => {
  it('should not render if no address', snapshot({}))
  it('should render if address', snapshot({ address: 'c' }))
})
