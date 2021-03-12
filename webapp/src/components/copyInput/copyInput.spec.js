/* eslint-env jest */
/* eslint-disable react/jsx-filename-extension */
import snap from 'tests/snapshot'
import CopyInput from './index.js'

const snapshot = (props) => snap(CopyInput)({ ...props })

describe('components/copyInput', () => {
  it('should render with all props', snapshot({ title: 't', value: 'v' }))
  it('should render without title', snapshot({ value: 'v' }))
  it('should render without props', snapshot({}))
})
