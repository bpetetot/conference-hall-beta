import React from 'react'
import PropTypes from 'prop-types'
import { Field, propTypes } from 'redux-form'

import { SubmitButton, toggle, checkbox } from 'components/form'

import './survey.css'

const SurveyForm = ({ surveyActive, ...formProps }) => (
  <form className="survey-form card">
    <Field name="surveyActive" label="Activate Speaker Survey" component={toggle} />
    <p className="survey-label">Select questions that you want to ask to speakers :</p>
    <Field
      name="survey.gender"
      label="What's your gender?"
      info="(male, female, no gender)"
      component={checkbox}
      disabled={!surveyActive}
    />
    <Field
      name="survey.tshirt"
      label="What's your Tshirt size?"
      info="(men&apos;s S, M, L, XL, XXL, women&apos;s S, M, L, LX, XXL )"
      component={checkbox}
      disabled={!surveyActive}
    />
    <Field
      name="survey.accomodation"
      label="Do you need accommodation funding?"
      component={checkbox}
      disabled={!surveyActive}
    />
    <Field
      name="survey.transports"
      label="Do you need transports funding?"
      component={checkbox}
      disabled={!surveyActive}
    />
    <Field
      name="survey.diet"
      label="Do you have any special diet restrictions?"
      info="(vegetarian, vegan, halal, gluten-free, nut allergy)"
      component={checkbox}
      disabled={!surveyActive}
    />
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
