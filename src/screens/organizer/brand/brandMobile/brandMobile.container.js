import { connect } from 'react-redux'
import { goBack } from 'redux-little-router'

import BrandMobile from './brandMobile'

const mapState = state => ({
  opened: state.router.pathname === '/organizer/menu',
})

const mapDispatch = dispatch => ({
  goBack: () => dispatch(goBack()),
})

export default connect(mapState, mapDispatch)(BrandMobile)
