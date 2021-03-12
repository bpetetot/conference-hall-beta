/* eslint-env jest */
import snap from 'tests/snapshot'
import IconLabel from './index.js'

const snapshot = (props) => snap(IconLabel)({ ...props })

describe('components/iconLabel', () => {
  it('should not render if no label', snapshot({ icon: 'i' }))
  it('should render icon label', snapshot({ icon: 'i', label: 'l' }))
  it('should render icon label with class', snapshot({ icon: 'i', label: 'l', className: 'c' }))
  it('should render icon label on right', snapshot({ icon: 'i', label: 'l', right: true }))
})
