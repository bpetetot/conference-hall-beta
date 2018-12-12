import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import EventForm from '../form'

const mapStore = store => ({
  isCreateForm: true,
  organizations: store.data.organizations.getAsArray(),
  initialValues: {
    type: 'conference',
    isPrivate: false,
    conferenceDates: {},
  },
  onSubmit: payload => store.dispatch({ type: '@@ui/ON_CREATE_EVENT', payload }),
})

export default compose(
  forRoute.absolute('CREATE_EVENT'), //
  inject(mapStore), //
)(EventForm)
