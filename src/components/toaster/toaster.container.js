import { connect } from 'react-redux'

import { getToasts } from 'redux/ui/toaster'
import Toaster from './toaster'

const mapState = state => ({
  toasts: getToasts(state),
})

export default connect(mapState)(Toaster)
