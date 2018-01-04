import forRoute from 'hoc-little-router'

import Event from 'screens/components/event'

export default forRoute('PUBLIC_EVENT', { absolute: true })(Event)
