/* eslint-env jest */
import snap from 'tests/snapshot'
import {checkbox} from './index'

const snapshot = props => snap(checkbox)({ ...props })

describe('components/renderCheckbox', () => {
  it('should render', snapshot({ input: { name: 'value', label: 'label' } }))
})
