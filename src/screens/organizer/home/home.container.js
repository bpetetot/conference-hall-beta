import { connect } from 'react-redux'

import { toast } from 'redux/ui/toaster'
import Home from './home'

const mapDispatch = dispatch => ({
  toast: date => dispatch(toast(date, date)),
})

export default connect(undefined, mapDispatch)(Home)
