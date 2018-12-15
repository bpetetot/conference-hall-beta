import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { formValueSelector } from 'redux-form'
import { forRoute } from '@k-redux-router/react-k-ramel'

import EventForm from '../form'

const FORM_NAME = 'event-create'
const select = formValueSelector(FORM_NAME)

const mapStore = store => ({
  form: FORM_NAME,
  type: select(store.getState(), 'type'),
  initialValues: {
    type: 'conference',
    isPrivate: false,
    conferenceDates: {},
  },
  organizations: store.data.organizations.getAsArray(),
  onSubmit: () => store.dispatch('@@ui/ON_CREATE_EVENT'),
})

export default compose(
  forRoute.absolute('CREATE_EVENT'), //
  inject(mapStore), //
)(EventForm)
