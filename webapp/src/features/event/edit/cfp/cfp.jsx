import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import cn from 'classnames'

import Field from 'components/form/field'
import {
  useAddCategory,
  useAddFormat,
  useDeleteCategory,
  useDeleteFormat,
  useUpdateCfpEvent,
  useUpdateCategory,
  useUpdateFormat,
} from 'data/event'
import { input, dayRangePicker, Label, SubmitButton, toggle, ItemsWithModal } from 'components/form'
import { useNotification } from 'app/layout/notification/context'

import CategoryForm from './categoryForm'
import FormatForm from './formatForm'
import styles from './cfp.module.css'

const CFPForm = ({ event }) => {
  const { sendError } = useNotification()
  const { mutateAsync: updateCfp } = useUpdateCfpEvent(event.id)
  const { mutate: addFormat } = useAddFormat(event.id)
  const { mutate: saveFormat } = useUpdateFormat(event.id)
  const { mutate: removeFormat } = useDeleteFormat(event.id)
  const { mutate: addCategory } = useAddCategory(event.id)
  const { mutate: saveCategory } = useUpdateCategory(event.id)
  const { mutate: removeCategory } = useDeleteCategory(event.id)

  const initialValues = useMemo(
    () => ({
      cfpDates: {
        start: event.cfpStart,
        end: event.cfpEnd,
      },
      maxProposals: event.maxProposals,
      cfpOpened: !!event.cfpStart,
      categories: event.categories,
      categoriesRequired: event.categoriesRequired,
      formats: event.formats,
      formatsRequired: event.formatsRequired,
    }),
    [event],
  )

  const onUpdateCfp = (data) => {
    const saved = { ...data }
    if (event.type === 'MEETUP') {
      const start = data.cfpOpened ? new Date() : null
      saved.cfpDates = { start, end: null }
    }
    return updateCfp(saved).catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  }

  return (
    <Form onSubmit={onUpdateCfp} initialValues={initialValues} mutators={{ ...arrayMutators }}>
      {({ handleSubmit, pristine, submitting }) => (
        <form className={cn(styles.form, 'card')}>
          {event.type === 'CONFERENCE' && (
            <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} inline />
          )}
          {event.type === 'CONFERENCE' && (
            <Field
              name="maxProposals"
              label="Max proposals"
              type="number"
              component={input}
              inline
            />
          )}
          {event.type === 'MEETUP' && (
            <Field name="cfpOpened" label="Enable CFP" type="checkbox" component={toggle} />
          )}
          <Label name="categories" label="Talk Categories" inline>
            <ItemsWithModal
              name="categories"
              onAddItem={addCategory}
              onSaveItem={saveCategory}
              onRemoveItem={removeCategory}
              form={CategoryForm}
            />
          </Label>
          <Label name="formats" label="Talk Formats" inline>
            <ItemsWithModal
              name="formats"
              onAddItem={addFormat}
              onSaveItem={saveFormat}
              onRemoveItem={removeFormat}
              form={FormatForm}
            />
          </Label>
          <Label
            name="mandatoryFields"
            label="Mandatory fields"
            hints="Define mandatory fields during the speaker submission."
            classNameInput={styles.checkboxes}
            inline
          >
            <label htmlFor="categoriesRequired">
              <Field
                id="categoriesRequired"
                name="categoriesRequired"
                component="input"
                type="checkbox"
              />
              Talk categories
            </label>
            <label htmlFor="formatsRequired">
              <Field
                id="formatsRequired"
                name="formatsRequired"
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

CFPForm.propTypes = {
  event: PropTypes.object.isRequired,
}

export default CFPForm
