import { connect } from 'react-redux'

import { getCategory } from 'redux/data/events'
import Badge from 'components/badge'

const mapState = (state, { eventId, categoryId }) => {
  const category = getCategory(eventId, categoryId)(state) || {}
  return { children: category.name }
}

export default connect(mapState)(Badge)
