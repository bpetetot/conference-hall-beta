/* eslint-env jest */
import snap from 'tests/snapshot'
import IconLink from './index.js'

jest.mock('../iconLabel', () => 'IconLabel')

const snapshot = props => snap(IconLink)({ ...props })

describe('components/iconLink', () => {
  it('should not render if no label', snapshot({ icon: 'i', href: 'h' }))
  it('should not render if no href', snapshot({ icon: 'i', label: 'h' }))
  it('should render icon link', snapshot({ icon: 'i', label: 'l', href: 'h' }))
})
