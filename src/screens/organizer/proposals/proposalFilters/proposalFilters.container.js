import { connect } from 'react-redux'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import ProposalFilters from './proposalFilters'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const { formats, categories } = eventsData.get(eventId)(state) || {}
  return { formats, categories }
}

export default connect(mapState)(ProposalFilters)
