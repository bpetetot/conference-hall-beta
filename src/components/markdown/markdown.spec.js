/* eslint-env jest */
import snap from 'tests/snapshot'
import Markdown from './index.js'

jest.mock('react-markdown', () => 'react-markdown')

const snapshot = props => snap(Markdown)({ ...props })

describe('components/mardown', () => {
  it('should not render if no source', snapshot({}))
  it('should render', snapshot({ source: 'source' }))
})
