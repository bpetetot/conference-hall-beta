import { inject } from '@k-ramel/react'

import Actions from './actions'

const mapState = (store, { eventId }) => {
  const { surveyActive, displayOrganizersRatings } = store.data.events.get(eventId) || {}
  return { surveyActive, displayOrganizersRatings }
}

export default inject(mapState)(Actions)
