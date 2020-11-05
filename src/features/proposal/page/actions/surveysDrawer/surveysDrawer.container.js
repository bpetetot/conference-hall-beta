import { inject } from '@k-ramel/react'

import SurveysDrawer from './surveysDrawer'

const mapState = (store, { proposalId }) => {
  const { speakers } = store.data.proposals.get(proposalId) || {}
  return { userIds: Object.keys(speakers) }
}

export default inject(mapState)(SurveysDrawer)
