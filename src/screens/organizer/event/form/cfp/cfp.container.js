import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import CFPForm from './cfp'

const mapDispatch = () => ({
  onSubmit: data => console.log(data),
})

export default compose(
  forRoute('EDIT_EVENT_CFP', { absolute: true }),
  connect(undefined, mapDispatch),
  reduxForm({ form: 'cfp-edit' }),
)(CFPForm)
