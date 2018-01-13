import { connect } from 'react-redux'

import { getRouterParam } from 'redux/router'
import eventsData, { getCfpState } from 'redux/data/events'
import CfpBlock from './cfpBlock'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const {
    id, type, cfpDates, deliberationDate,
  } = eventsData.get(eventId)(state)
  return {
    cfpState: getCfpState(id)(state),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default connect(mapState)(CfpBlock)
