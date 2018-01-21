import { connect } from 'react-redux'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import filtersUI from 'redux/ui/organizer/proposals/filters'
import ProposalFilters from './proposalFilters'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const filters = filtersUI.get()(state)
  const { formats, categories } = eventsData.get(eventId)(state) || {}
  return { formats, categories, filters }
}

const mapDispatch = dispatch => ({
  onChange: ({ target }) => dispatch(filtersUI.update({ [target.id]: target.value })),
})

export default connect(mapState, mapDispatch)(ProposalFilters)
