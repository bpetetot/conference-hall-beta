import { connect } from 'react-redux'

import { getUser } from 'redux/auth'
import Sidebar from './sidebar'

const mapState = state => ({
  fullname: getUser(state).displayName,
})

export default connect(mapState)(Sidebar)
