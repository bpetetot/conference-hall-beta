import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { input, textarea, radio, SubmitButton, RadioGroup } from 'components/form'
import { required } from 'components/form/validators'
import './talkForm.css'

const TalkForm = formProps => (
  <form className="talk-form card">
    <Field name="title" label="Title" type="text" component={input} validate={required} />
    <Field name="abstract" label="Abstract" component={textarea} />
    <RadioGroup name="level" label="Level" inline>
      <Field name="level" value="beginner" label="Beginner" type="radio" component={radio} />
      <Field
        name="level"
        value="intermediate"
        label="Intermediate"
        type="radio"
        component={radio}
      />
      <Field name="level" value="advanced" label="Advanced" type="radio" component={radio} />
    </RadioGroup>
    <Field name="references" label="References" component={textarea} />
    <SubmitButton {...formProps}>Create Talk</SubmitButton>
  </form>
)

export default reduxForm()(TalkForm)
