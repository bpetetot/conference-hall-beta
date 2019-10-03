import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import styles from './meetupForm.module.css'

const MeetupForm = ({ onSubmit, initialValues, submitting }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ handleSubmit, pristine }) => (
      <form className={cn(styles.form, 'card')}>
        <Field name="name" label="Name" type="text" component={input} validate={required} />
        <Field name="description" label="Description" type="text" component={textarea} />
        <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
          {!initialValues ? 'Create meetup' : 'Save meetup'}
        </SubmitButton>
      </form>
    )}
  </Form>
)

MeetupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

MeetupForm.defaultProps = {
  initialValues: undefined,
  submitting: false,
}

export default MeetupForm
