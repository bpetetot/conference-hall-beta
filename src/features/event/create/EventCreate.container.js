import { inject } from '@k-ramel/react'

import EventCreate from './EventCreate'

const mapStore = (store) => ({
  isCreateForm: true,
  organizations: store.data.organizations.getAsArray(),
  initialValues: {
    type: 'conference',
    visibility: true,
    conferenceDates: {},
  },
})

export default inject(mapStore)(EventCreate)
