/* eslint-env jest */
import snap from 'tests/snapshot'
import Titlebar from './index.js'

jest.mock('date-fns/distance_in_words_to_now', () => () => '2 days ago')
jest.mock('../iconLabel', () => 'IconLabel')

const snapshot = props => snap(Titlebar)({ ...props })

describe('components/titlebar', () => {
  it('should not render if no date', snapshot({}))
  it('should not render if no date', snapshot({ date: new Date() }))
})
