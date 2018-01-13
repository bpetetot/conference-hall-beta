import { connect } from 'react-redux'

import eventsData, { getCfpState } from 'redux/data/events'
import CfpBlock from './cfpBlock'

const mapState = (state, { eventId }) => {
  const { type, cfpDates, deliberationDate } = eventsData.get(eventId)(state)
  return {
    cfpState: getCfpState(eventId)(state),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default connect(mapState)(CfpBlock)
