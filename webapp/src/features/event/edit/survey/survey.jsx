import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'

import questions from 'features/survey/questions'

import './survey.css'
import { useUpdateEventField } from 'data/event'

const SurveyForm = ({ event }) => {
  const { mutate: onActiveSurvey } = useUpdateEventField(event.id, 'surveyEnabled')
  const { mutate: onSaveSurvey } = useUpdateEventField(event.id, 'surveyQuestions')

  const onSelectQuestion = async (e) => {
    const { name, checked } = e.target
    const data = { ...(event.surveyQuestions || {}), [name]: checked }
    await onSaveSurvey(data)
  }
  return (
    <div className="survey-form card">
      <Label name="surveyActive" label="Enable Survey">
        <Toggle name="surveyActive" checked={event.surveyEnabled} onChange={onActiveSurvey} />
      </Label>
      <h4>Select questions that you want to ask to speakers :</h4>
      {questions.map((question) => (
        <Checkbox
          key={question.name}
          name={question.name}
          label={question.label}
          info={question.organizerInfo}
          onChange={onSelectQuestion}
          defaultChecked={!!event.surveyQuestions?.[question.name]}
          disabled={!event.surveyEnabled}
        />
      ))}
    </div>
  )
}

SurveyForm.propTypes = {
  event: PropTypes.object.isRequired,
}

export default SurveyForm
