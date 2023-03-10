/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import Field from 'components/form/field'

import './surveyInput.css'

function SurveyInput({ name, label, type, answers }) {
  return (
    <div className="survey-input">
      <label htmlFor={name}>{label}</label>
      {answers ? (
        answers.map((answer) => (
          <div key={answer.name}>
            <label htmlFor={type === 'radio' ? name : `${name}.${answer.name}`}>
              <Field
                name={type === 'radio' ? name : `${name}.${answer.name}`}
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
}

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
