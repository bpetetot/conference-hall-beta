import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import Actions from './actions'

const mapState = (store, { eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)
  const { surveyActive } = store.data.events.get(eventId) || {}
  return {
    surveyActive,
    displayOrganizersRatings: get(settings, 'deliberation.displayRatings'),
  }
}

export default inject(mapState)(Actions)
