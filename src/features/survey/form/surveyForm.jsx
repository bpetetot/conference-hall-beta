import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import { SubmitButton } from 'components/form'
import SurveyInput from './surveyInput'
import questions from '../questions'

function SurveyForm({ survey, onSubmit, initialValues, submitting }) {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine }) => (
        <form>
          {questions.map((q) => survey[q.name] && <SurveyInput key={q.name} {...q} />)}
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
            Save Survey
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

SurveyForm.propTypes = {
  survey: PropTypes.objectOf(PropTypes.bool),
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

SurveyForm.defaultProps = {
  survey: {},
  initialValues: undefined,
  submitting: false,
}

export default SurveyForm
