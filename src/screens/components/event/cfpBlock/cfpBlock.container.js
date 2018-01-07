import { connect } from 'react-redux'

import { getEventFromRouterParam, getCfpState } from 'redux/data/events'
import CfpBlock from './cfpBlock'

const mapState = (state) => {
  const {
    id, type, cfpDates, deliberationDate,
  } = getEventFromRouterParam(state)
  return {
    cfpState: getCfpState(id)(state),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default connect(mapState)(CfpBlock)
