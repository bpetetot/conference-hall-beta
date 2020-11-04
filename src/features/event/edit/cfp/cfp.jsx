import React from 'react'
import pick from 'lodash/pick'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import cn from 'classnames'

import { useParams } from 'react-router-dom'
import { useEvent, useSaveEvent } from 'features/event/useEvents'
import Field from 'components/form/field'
import { input, dayPicker, dayRangePicker, Label, SubmitButton, toggle } from 'components/form'
import CategoriesField from './categories'
import FormatsField from './formats'

import styles from './cfp.module.css'

const CFPForm = () => {
  const { eventId } = useParams()
  const { data: event } = useEvent(eventId)
  const [saveEvent] = useSaveEvent(eventId)

  const initialValues = pick(event, [
    'cfpDates',
    'deliberationDate',
    'maxProposals',
    'cfpOpened',
    'categories',
    'formats',
    'mandatoryFields',
  ])

  return (
    <Form onSubmit={saveEvent} initialValues={initialValues} mutators={{ ...arrayMutators }}>
      {({ handleSubmit, pristine, submitting }) => (
        <form className={cn(styles.form, 'card')}>
          {event.isConference() && (
            <>
              <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} inline />
              <Field
                name="deliberationDate"
                label="Deliberation date"
                component={dayPicker}
                inline
              />
              <Field
                name="maxProposals"
                label="Max proposals"
                type="number"
                component={input}
                inline
              />
            </>
          )}
          {event.isMeetup() && (
            <Field name="cfpOpened" label="Enable CFP" type="checkbox" component={toggle} />
          )}
          <Label name="categories" label="Talk Categories" inline>
            <CategoriesField />
          </Label>
          <Label name="formats" label="Talk Formats" inline>
            <FormatsField />
          </Label>
          <Label
            name="mandatoryFields"
            label="Mandatory fields"
            hints="Define mandatory fields during the speaker submission."
            classNameInput={styles.checkboxes}
            inline
          >
            <label htmlFor="mandatoryFields.categories">
              <Field
                id="mandatoryFields.categories"
                name="mandatoryFields.categories"
                component="input"
                type="checkbox"
              />
              Talk categories
            </label>
            <label htmlFor="mandatoryFields.formats">
              <Field
                id="mandatoryFields.formats"
                name="mandatoryFields.formats"
                component="input"
                type="checkbox"
              />
              Talk formats
            </label>
          </Label>
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
            Save CFP settings
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

export default CFPForm
