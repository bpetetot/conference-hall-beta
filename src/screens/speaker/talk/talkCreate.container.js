import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import TalkForm from './talkForm'

const FORM_NAME = 'talk-create'

const mapState = () => ({ form: FORM_NAME })

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_TALK_FORM',
      payload: { talk: data, form: FORM_NAME },
    }),
})

export default compose(
  forRoute('CREATE_TALK', { absolute: true }), //
  connect(mapState, mapDispatch), //
)(TalkForm)
