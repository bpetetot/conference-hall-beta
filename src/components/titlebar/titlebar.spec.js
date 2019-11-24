/* eslint-env jest */
import snap from 'tests/snapshot'
import Titlebar from './index.js'

jest.mock('../iconLabel', () => 'IconLabel')

const snapshot = props => snap(Titlebar)({ ...props })

describe('components/titlebar', () => {
  it(
    'should render',
    snapshot({
      icon: 'i',
      title: 't',
      children: 'c',
      className: 'cn',
    }),
  )
})
