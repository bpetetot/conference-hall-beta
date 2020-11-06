import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import { useEvent } from 'features/event/useEvents'
import languages from 'helpers/language.json'
import Field from 'components/form/field'
import Button from 'components/button'
import { input, markdownInput, radio, SubmitButton, RadioGroup, select } from 'components/form'
import { required } from 'components/form/validators'

import styles from './form.module.css'

const EditProposalForm = ({ eventId, onSubmit, onClose, initialValues }) => {
  const { data: event } = useEvent(eventId)

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid }) => (
        <form className={styles.form}>
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
          {!isEmpty(event?.categories) && (
            <RadioGroup name="categories" label="Talk categories" inline>
              {event?.categories.map((c) => (
                <Field
                  key={c.id}
                  name="categories"
                  value={c.id}
                  label={c.name}
                  type="radio"
                  component={radio}
                />
              ))}
            </RadioGroup>
          )}
          {!isEmpty(event?.formats) && (
            <RadioGroup name="formats" label="Talk formats" inline>
              {event?.formats.map((f) => (
                <Field
                  key={f.id}
                  name="formats"
                  value={f.id}
                  label={f.name}
                  type="radio"
                  component={radio}
                />
              ))}
            </RadioGroup>
          )}
          <div className={styles.buttons}>
            <Button secondary onClick={onClose}>
              Cancel
            </Button>
            <SubmitButton handleSubmit={handleSubmit} pristine={pristine} invalid={invalid}>
              Save proposal changes
            </SubmitButton>
          </div>
        </form>
      )}
    </Form>
  )
}

EditProposalForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
}

export default EditProposalForm
