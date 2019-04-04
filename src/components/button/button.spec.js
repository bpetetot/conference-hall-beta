/* eslint-env jest */
import snap from 'tests/snapshot'
import Button from './index.js'

const snapshot = props => snap(Button)({ ...props })

describe('components/button', () => {
  it('should render with children', snapshot({ children: 'Benjamin', className: 'test', secondary: true }))
})
