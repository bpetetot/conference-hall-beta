import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Actions from './actions'

const mapState = (store, { eventId }) => {
  const { surveyActive, displayOrganizersRatings } = store.data.events.get(eventId) || {}
  return { surveyActive, displayOrganizersRatings }
}

export default compose(inject(mapState), loader())(Actions)
