import { connect } from 'react-redux'

import event, { getCfpState } from 'redux/data/event'
import CfpBlock from './cfpBlock'

const mapState = (state) => {
  const { type, cfpDates, deliberationDate } = event.get()(state)
  return {
    cfpState: getCfpState(state),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default connect(mapState)(CfpBlock)
