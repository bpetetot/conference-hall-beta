import React from 'react'
import PropTypes from 'prop-types'

import { getQuestion, getAnswersLabel } from 'features/event/survey/questions'

const Answer = ({ question, answer }) => {
  const answerLabel = getAnswersLabel(question, answer)
  if (!answerLabel) return null

  const questionObj = getQuestion(question)
  return (
    <div className="question">
      <small>{questionObj.shortLabel}:</small>
      <small className="answer">{answerLabel}</small>
    </div>
  )
}

Answer.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Answer.defaultProps = {
  answer: undefined,
}

export default Answer
