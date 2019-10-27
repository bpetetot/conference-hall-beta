import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import CustomizeForm from './customize'

const mapStore = (store, { eventId }) => ({
  onChangeBanner: (url) => store.dispatch({
    type: '@@ui/ON_EVENT_BANNER_UPLOADED',
    payload: {
      event: {
        id: eventId,
        bannerUrl: url,
      },
    },
  }),
})

export default compose(
  forRoute.absolute('organizer-event-edit-customize'),
  inject(mapStore),
)(CustomizeForm)
