import { connect } from 'react-redux'

import user from 'redux/data/user'
import Sidebar from './sidebar'

const mapState = state => ({
  fullname: user.get()(state).displayName,
})

export default connect(mapState)(Sidebar)
