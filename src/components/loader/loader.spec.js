/* eslint-env jest */
import snap from 'tests/snapshot'
import { LoadingIndicator } from './index.js'

jest.mock('./loading', () => 'LoadingIndicator')
jest.mock('hoc-react-loader/build/core')

const snapshot = props => snap(LoadingIndicator)({ ...props })

describe('components/loader', () => {
  describe('LoadingIndicator', () => {
    it('should render', snapshot({ className: 'c' }))
  })
})
