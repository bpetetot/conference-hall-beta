import React from 'react'
import PropTypes from 'prop-types'
import { propTypes } from 'redux-form'

import { SubmitButton } from 'components/form'
import questions from 'screens/components/event/survey/questions'
import SurveyInput from './surveyInput'

const SurveyForm = ({ survey, ...formProps }) => (
  <form>
    {questions.map(q => survey[q.name] && <SurveyInput key={q.name} {...q} />)}
    <SubmitButton {...formProps}>Save Survey</SubmitButton>
  </form>
)

SurveyForm.propTypes = {
  survey: PropTypes.objectOf(PropTypes.bool),
  ...propTypes,
}

SurveyForm.defaultProps = {
  survey: {},
}

export default SurveyForm
