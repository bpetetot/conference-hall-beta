import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import talk from 'redux/data/talk'
import LoadingIndicator from 'components/loading'
import TalkForm from '../components/talkForm'

const FORM_NAME = 'talk-edit'

const mapState = state => ({
  loaded: talk.isInitialized(state),
  form: FORM_NAME,
  initialValues: { ...talk.get()(state) },
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_TALK' }),
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_TALK_FORM',
      payload: { talk: data, form: FORM_NAME },
    }),
})

export default compose(
  forRoute('EDIT_TALK', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(TalkForm)
