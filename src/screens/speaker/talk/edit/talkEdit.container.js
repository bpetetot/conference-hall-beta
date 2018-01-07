import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import talksData from 'redux/data/talks'
import LoadingIndicator from 'components/loading'
import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-edit'

const mapState = (state) => {
  const { id } = state.router.params
  const talk = talksData.get(id)(state)
  return {
    loaded: !!talk,
    form: FORM_NAME,
    initialValues: { ...talk },
  }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK_FROM_ROUTER_PARAMS' }),
  onSubmit: data => dispatch({ type: 'SUBMIT_UPDATE_TALK_FORM', payload: data }),
})

export default compose(
  forRoute('EDIT_TALK', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkForm)
