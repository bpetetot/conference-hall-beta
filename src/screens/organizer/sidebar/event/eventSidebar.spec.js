/* eslint-env jest */
import snap from 'tests/snapshot'
import EventSidebar from './eventSidebar'

jest.mock('components/iconLabel', () => 'IconLabel')
jest.mock('components/sidebar', () => ({
  SideBarLink: () => 'SideBarLink',
  SideBarPanel: () => 'SideBarPanel',
}))

const snapshot = props => snap(EventSidebar)({ ...props })

describe('screens/organizer/sidebar/event', () => {
  it('should not render without event id', snapshot({}))
  it('should render with event data', snapshot({ eventId: 'eventId', name: 'eventName' }))
})
