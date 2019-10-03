import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Form } from 'react-final-form'

import Button from 'components/button'
import Field from 'components/form/field'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import styles from './meetupForm.module.css'

const MeetupForm = ({
  onDelete, onSubmit, initialValues, submitting,
}) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ handleSubmit, pristine }) => (
      <form className={cn(styles.form, 'card')}>
        <Field name="name" label="Name" type="text" component={input} validate={required} />
        <Field name="description" label="Description" type="text" component={textarea} />
        {(initialValues && onDelete) && (
          <Button error secondary onClick={onDelete}>
            Delete Meetup
          </Button>
        )}
        <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
          {!initialValues ? 'Create meetup' : 'Save meetup'}
        </SubmitButton>
      </form>
    )}
  </Form>
)

MeetupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

MeetupForm.defaultProps = {
  initialValues: undefined,
  onDelete: undefined,
  submitting: false,
}

export default MeetupForm
