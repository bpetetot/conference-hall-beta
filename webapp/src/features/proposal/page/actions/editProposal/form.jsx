import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import languages from 'helpers/language.json'
import Field from 'components/form/field'
import Button from 'components/button'
import { input, markdownInput, radio, SubmitButton, RadioGroup, select } from 'components/form'
import { required } from 'components/form/validators'
import { useUpdateProposal } from 'data/proposal'
import { useNotification } from 'app/layout/notification/context'

import styles from './form.module.css'

const EditProposalForm = ({ event, proposal, onClose }) => {
  const { mutateAsync } = useUpdateProposal(event.id, proposal.id)
  const { sendError } = useNotification()

  const initialValues = useMemo(
    () => ({
      title: proposal.title,
      abstract: proposal.abstract,
      language: proposal.languages && proposal.languages[0],
      level: proposal.level,
      format: !isEmpty(proposal.formats) ? String(proposal.formats[0].id) : null,
      category: !isEmpty(proposal.categories) ? String(proposal.categories[0].id) : null,
    }),
    [proposal],
  )

  const onSubmit = async (data) => {
    await mutateAsync(data).catch((err) =>
      sendError(`An unexpected error has occurred: ${err.message}`),
    )
    onClose()
  }

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
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
            <Field name="level" value="BEGINNER" label="Beginner" type="radio" component={radio} />
            <Field
              name="level"
              value="INTERMEDIATE"
              label="Intermediate"
              type="radio"
              component={radio}
            />
            <Field name="level" value="ADVANCED" label="Advanced" type="radio" component={radio} />
          </RadioGroup>
          {!isEmpty(event.categories) && (
            <RadioGroup name="categories" label="Talk categories" inline>
              {event.categories.map((c) => (
                <Field
                  key={c.id}
                  name="category"
                  value={String(c.id)}
                  label={c.name}
                  type="radio"
                  component={radio}
                />
              ))}
            </RadioGroup>
          )}
          {!isEmpty(event.formats) && (
            <RadioGroup name="formats" label="Talk formats" inline>
              {event.formats.map((f) => (
                <Field
                  key={f.id}
                  name="format"
                  value={String(f.id)}
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
            <SubmitButton
              handleSubmit={handleSubmit}
              pristine={pristine}
              invalid={invalid}
              submitting={submitting}
            >
              Save proposal changes
            </SubmitButton>
          </div>
        </form>
      )}
    </Form>
  )
}

EditProposalForm.propTypes = {
  event: PropTypes.object.isRequired,
  proposal: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditProposalForm
