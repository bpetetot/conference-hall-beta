import { connect } from 'react-redux'

import EventTabs from './eventTabs'

const mapState = (state) => {
  const { id } = state.router.params
  return { id }
}

export default connect(mapState)(EventTabs)
