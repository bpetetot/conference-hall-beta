import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import EventEdit from './eventEdit'

const mapStore = (store, props, { router }) => {
  const eventId = router.getPathParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    eventId,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT'),
  }
}

export default compose(
  forRoute('EDIT_EVENT'), //
  inject(mapStore), //
  loader, //
)(EventEdit)
