import { connect } from 'react-redux'

import { getFormat, getCategory } from 'redux/data/events'
import { getRouterParam } from 'redux/router'
import ProposalSubtitle from './proposalSubtitle'

const mapState = (state, { proposal }) => {
  const eventId = getRouterParam('eventId')(state)
  const format = getFormat(eventId, proposal.formats)(state) || {}
  const category = getCategory(eventId, proposal.categories)(state) || {}
  return {
    formats: format.name,
    categories: category.name,
    state: proposal.state,
  }
}

export default connect(mapState)(ProposalSubtitle)
