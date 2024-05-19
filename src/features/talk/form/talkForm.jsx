import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import languages from 'helpers/language.json'

import Field from 'components/form/field'
import { input, markdownInput, radio, SubmitButton, RadioGroup, select } from 'components/form'
import { required } from 'components/form/validators'
import './talkForm.css'

function TalkForm({ onSubmit, initialValues }) {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <form className="talk-form card">
          <Field
            name="title"
            label="Title"
            type="text"
            component={input}
            validate={required}
            inline
          />
          <Field
            name="abstract"
            label="Abstract"
            component={markdownInput}
            validate={required}
            inline
          />
          <Field name="language" label="Talk language" type="text" component={select} inline>
            <option />
            {Object.entries(languages).map(([id, name]) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </Field>

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
          <Field
            name="references"
            label="Talk References"
            tooltip="Give more info about your talk: slides, workshop prerequisites, github repo, video, summary, steps of the talk, which conference or meetup where it has been already given?"
            component={markdownInput}
            inline
          />
          <SubmitButton
            handleSubmit={handleSubmit}
            pristine={pristine}
            invalid={invalid}
            submitting={submitting}
          >
            {!initialValues ? 'Create Talk' : 'Save Talk'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

TalkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

TalkForm.defaultProps = {
  initialValues: undefined,
}

export default TalkForm
