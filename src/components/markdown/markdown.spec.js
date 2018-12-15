/* eslint-env jest */
import snap from 'tests/snapshot'
import Markdown, { MarkdownIcon } from './index.js'

const snapshot = props => snap(Markdown)({ ...props })
const snapshotIcon = props => snap(MarkdownIcon)({ ...props })

describe('components/mardown', () => {
  it('should not render if no source', snapshot({}))
  it('should render', snapshot({ source: 'source' }))
  it('should render icon', snapshotIcon({ className: 'c' }))
})
