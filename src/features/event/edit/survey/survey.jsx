import React from 'react'
import { useParams } from 'react-router-dom'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'

import questions from 'features/survey/questions'

import './survey.css'
import { useEvent, useSaveEvent } from 'features/event/useEvents'

const SurveyForm = () => {
  const { eventId } = useParams()
  const { data: event } = useEvent(eventId)
  const [saveEvent] = useSaveEvent(eventId)

  const onActiveSurvey = (checked) => saveEvent({ surveyActive: checked })
  const onSelectQuestion = ({ target }) => saveEvent({ [`survey.${target.name}`]: target.checked })

  return (
    <div className="survey-form card">
      <Label name="surveyActive" label="Enable Survey">
        <Toggle name="surveyActive" checked={event?.surveyActive} onChange={onActiveSurvey} />
      </Label>
      <h4>Select questions that you want to ask to speakers :</h4>
      {questions.map((question) => (
        <Checkbox
          key={question.name}
          name={question.name}
          label={question.label}
          info={question.organizerInfo}
          onChange={onSelectQuestion}
          value={event?.survey?.[question.name]}
          disabled={!event?.surveyActive}
        />
      ))}
    </div>
  )
}

export default SurveyForm
