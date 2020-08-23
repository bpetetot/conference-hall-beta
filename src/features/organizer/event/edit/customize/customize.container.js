import { inject } from '@k-ramel/react'

import CustomizeForm from './customize'

const mapStore = (store, { eventId }) => ({
  onChangeBanner: (url) =>
    store.dispatch({
      type: '@@ui/ON_EVENT_BANNER_UPLOADED',
      payload: {
        event: {
          id: eventId,
          bannerUrl: url,
        },
      },
    }),
})

export default inject(mapStore)(CustomizeForm)
