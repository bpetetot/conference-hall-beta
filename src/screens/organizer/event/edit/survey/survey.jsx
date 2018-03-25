import React from 'react'
import PropTypes from 'prop-types'
import { Field, propTypes } from 'redux-form'

import { SubmitButton, toggle, checkbox } from 'components/form'
import questions from 'screens/components/event/survey/questions'

import './survey.css'

const SurveyForm = ({ surveyActive, ...formProps }) => (
  <form className="survey-form card">
    <Field name="surveyActive" label="Activate Speaker Survey" component={toggle} />
    <p className="survey-label">Select questions that you want to ask to speakers :</p>
    {questions.map(question => (
      <Field
        key={question.name}
        name={`survey.${question.name}`}
        label={question.label}
        info={question.organizerInfo}
        component={checkbox}
        disabled={!surveyActive}
      />
    ))}
    <SubmitButton {...formProps}>Save Survey</SubmitButton>
  </form>
)

SurveyForm.propTypes = {
  surveyActive: PropTypes.bool,
  ...propTypes,
}

SurveyForm.defaultProps = {
  surveyActive: false,
}

export default SurveyForm
