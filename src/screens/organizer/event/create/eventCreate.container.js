import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import EventForm from '../components/eventForm'

const FORM_NAME = 'event-create'
const select = formValueSelector(FORM_NAME)

const mapStore = store => ({
  form: FORM_NAME,
  type: select(store.getState(), 'type'),
  initialValues: { type: 'conference', conferenceDates: {} },
  onSubmit: () => store.dispatch('@@ui/ON_CREATE_EVENT'),
  loaded: store.ui.organizer.myOrganizations.isInitialized(),
  organizations: store.ui.organizer.myOrganizations.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZER_ORGANIZATIONS'),
})

export default compose(
  forRoute.absolute('CREATE_EVENT'), //
  inject(mapStore), //
  loader,
)(EventForm)
