/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import Field from 'components/form/field'

import './surveyInput.css'

const SurveyInput = ({ name, label, type, answers }) => (
  <div className="survey-input">
    <label htmlFor={name}>{label}</label>
    {answers ? (
      answers.map((answer) => (
        <div key={answer.name}>
          <label htmlFor={`${name}.${answer.name}`}>
            <Field
              id={`${name}.${answer.name}`}
              name={name}
              component="input"
              type={type}
              value={answer.name}
            />
            {answer.label}
          </label>
        </div>
      ))
    ) : (
      <Field name={name} id={name} component="input" type={type} value={name} />
    )}
  </div>
)

SurveyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(PropTypes.object),
}

SurveyInput.defaultProps = {
  answers: undefined,
}

export default SurveyInput
