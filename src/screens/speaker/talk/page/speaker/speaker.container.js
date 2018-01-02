import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import usersData from 'redux/data/users'
import Speaker from './speaker'

const mapState = (state, { id }) => {
  const { displayName, photoURL } = usersData.get(id)(state) || {}
  return { displayName, photoURL }
}

const mapDispatch = (dispatch, { id }) => ({
  load: () => dispatch({ type: 'FETCH_USER', payload: id }),
})

export default compose(connect(mapState, mapDispatch), loader())(Speaker)
