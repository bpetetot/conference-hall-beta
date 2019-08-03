import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import cn from 'classnames'

import Field from 'components/form/field'
import {
  input, dayPicker, dayRangePicker, Label, SubmitButton, toggle,
} from 'components/form'

import CategoriesField from './categories'
import FormatsField from './formats'

import styles from './cfp.module.css'

const CFPForm = ({
  type, onSubmit, initialValues, submitting,
}) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} mutators={{ ...arrayMutators }}>
    {({ handleSubmit, pristine }) => (
      <form className={cn(styles.form, 'card')}>
        {type === 'conference' && (
          <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} inline />
        )}
        {type === 'conference' && (
          <Field name="deliberationDate" label="Deliberation date" component={dayPicker} inline />
        )}
        {type === 'conference' && (
          <Field name="maxProposals" label="Max proposals" type="number" component={input} inline />
        )}
        {type === 'meetup' && (
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

CFPForm.propTypes = {
  type: PropTypes.oneOf(['conference', 'meetup']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

CFPForm.defaultProps = {
  initialValues: {},
  submitting: false,
}

export default CFPForm
