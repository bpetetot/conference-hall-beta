import { connect } from 'react-redux'

import { getFormat } from 'redux/data/events'
import Badge from 'components/badge'

const mapState = (state, { eventId, formatId }) => {
  const format = getFormat(eventId, formatId)(state) || {}
  return { children: format.name }
}

export default connect(mapState)(Badge)
