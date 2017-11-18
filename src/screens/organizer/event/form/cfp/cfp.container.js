import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import CFPForm from './cfp'

const mapState = () => ({
  initialValues: {
    deliberationDate: new Date(),
    cfpDates: { start: new Date(), end: new Date() },
  },
})

const mapDispatch = () => ({
  onSubmit: data => console.log(data),
})

export default compose(
  forRoute('EDIT_EVENT_CFP', { absolute: true }),
  connect(mapState, mapDispatch),
  reduxForm({ form: 'cfp-edit', enableReinitialize: true, keepDirtyOnReinitialize: true }),
)(CFPForm)
