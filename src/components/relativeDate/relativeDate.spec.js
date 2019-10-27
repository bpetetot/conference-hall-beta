/* eslint-env jest */
import snap from 'tests/snapshot'
import RelativeDate from './index.js'

jest.mock('date-fns/distance_in_words_to_now', () => () => '2 days ago')
jest.mock('../iconLabel', () => 'IconLabel')

const snapshot = (props) => snap(RelativeDate)({ ...props })

describe('components/relativeDate', () => {
  it('should not render if no date', snapshot({}))
  it('should render if date', snapshot({ date: new Date() }))
})
