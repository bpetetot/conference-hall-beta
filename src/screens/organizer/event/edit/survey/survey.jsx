import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'

import questions from 'screens/components/event/survey/questions'

import './survey.css'

const SurveyForm = ({
  surveyActive, survey, onActiveSurvey, onSelectQuestion,
}) => (
  <div className="survey-form card">
    <Label name="surveyActive" label="Enable Survey">
      <Toggle name="surveyActive" checked={surveyActive} onChange={onActiveSurvey} />
    </Label>
    <p className="survey-label">Select questions that you want to ask to speakers :</p>
    {questions.map(question => (
      <Checkbox
        key={question.name}
        name={question.name}
        label={question.label}
        info={question.organizerInfo}
        onChange={onSelectQuestion}
        value={survey[question.name]}
        disabled={!surveyActive}
      />
    ))}
  </div>
)

SurveyForm.propTypes = {
  surveyActive: PropTypes.bool,
  survey: PropTypes.objectOf(PropTypes.bool),
  onActiveSurvey: PropTypes.func.isRequired,
  onSelectQuestion: PropTypes.func.isRequired,
}

SurveyForm.defaultProps = {
  surveyActive: false,
  survey: {},
}

export default SurveyForm
