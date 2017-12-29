import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import event from 'redux/data/event'
import CFPForm from './cfp'

const FORM_NAME = 'cfp-edit'

const mapState = (state) => {
  const {
    id,
    type,
    cfpOpened = false,
    deliberationDate = null,
    cfpDates = {},
    categories = [],
    formats = [],
  } = event.get()(state)
  return {
    type,
    initialValues: {
      id,
      cfpOpened,
      deliberationDate,
      cfpDates,
      categories,
      formats,
    },
  }
}

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: FORM_NAME },
    }),
})

export default compose(
  forRoute('EDIT_EVENT_CFP', { absolute: true }),
  connect(mapState, mapDispatch),
  reduxForm({ form: 'cfp-edit' }),
)(CFPForm)
