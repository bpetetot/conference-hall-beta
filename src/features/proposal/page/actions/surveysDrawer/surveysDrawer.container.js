import { inject } from '@k-ramel/react'

import SurveysDrawer from './surveysDrawer'

const mapState = (store, { eventId, proposalId }) => {
  const { survey } = store.data.events.get(eventId) || {}
  const { speakers } = store.data.proposals.get(proposalId) || {}
  return { survey, userIds: Object.keys(speakers) }
}

export default inject(mapState)(SurveysDrawer)
