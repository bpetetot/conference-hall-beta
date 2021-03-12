import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import { useSurvey, useSaveSurvey } from 'data/survey'
import { SubmitButton } from 'components/form'
import SurveyInput from './surveyInput'
import questions from '../questions'

const SurveyForm = ({ eventId, survey }) => {
  const { data: userSurvey } = useSurvey(eventId)
  const { mutateAsync: onSaveSurvey } = useSaveSurvey(eventId)

  const initialValues = userSurvey?.answers || {}

  return (
    <Form onSubmit={onSaveSurvey} initialValues={initialValues}>
      {({ handleSubmit, pristine, submitting }) => (
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
  eventId: PropTypes.string.isRequired,
  survey: PropTypes.object,
}

SurveyForm.defaultProps = {
  survey: {},
}

export default SurveyForm
