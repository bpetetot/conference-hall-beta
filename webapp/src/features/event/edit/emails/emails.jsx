import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import { SubmitButton, input } from 'components/form'
import * as validators from 'components/form/validators'

import { useNotification } from '../../../../app/layout/notification/context'
import { useUpdateEmailNotifEvent } from '../../../../data/event'
import styles from './emails.module.css'

const EmailsForm = ({ event }) => {
  const initialValues = {
    emailOrganizer: event.emailOrganizer,
    submitted: Boolean(event?.emailNotifications?.submitted),
    accepted: Boolean(event?.emailNotifications?.accepted),
    rejected: Boolean(event?.emailNotifications?.rejected),
    confirmed: Boolean(event?.emailNotifications?.confirmed),
  }

  const { sendError } = useNotification()
  const { mutateAsync: updateNotif } = useUpdateEmailNotifEvent(event.id)

  const onSubmit = (data) => {
    return updateNotif(data).catch((error) => {
      sendError(`An unexpected error has occurred: ${error.message}`)
    })
  }

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, invalid, submitting }) => (
        <form className={cn(styles.form, 'card')}>
          <h2>Email notifications for organizers</h2>
          <Field
            name="emailOrganizer"
            label="Organizer notification email"
            type="text"
            tooltip="Email to receive emails or a copy of emails sent to speakers."
            placeholder="john.doe@example.com"
            component={input}
            validate={validators.email}
          />
          <h4>Configure which email you want to receive:</h4>
          <div className={styles.checkboxes}>
            <label htmlFor="submitted">
              <Field id="submitted" name="submitted" component="input" type="checkbox" />
              <span>
                Submitted proposals
                <br />
                <small>Receive an email when a speaker submit a talk.</small>
              </span>
            </label>
            <label htmlFor="accepted">
              <Field id="accepted" name="accepted" component="input" type="checkbox" />
              <span>
                Accepted proposals (bcc)
                <br />
                <small>Have a copy of acceptation emails sent to speakers.</small>
              </span>
            </label>
            <label htmlFor="rejected">
              <Field id="rejected" name="rejected" component="input" type="checkbox" />
              <span>
                Rejected proposals (bcc)
                <br />
                <small>Have a copy of rejection emails sent to speakers.</small>
              </span>
            </label>
            <label htmlFor="confirmed">
              <Field id="confirmed" name="confirmed" component="input" type="checkbox" />
              <span>
                Confirmed and declined proposals
                <br />
                <small>Receive an email when a speaker confirm or decline a talk.</small>
              </span>
            </label>
          </div>
          <SubmitButton
            handleSubmit={handleSubmit}
            pristine={pristine}
            invalid={invalid}
            submitting={submitting}
          >
            Save email notifications
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

EmailsForm.propTypes = {
  event: PropTypes.object.isRequired,
}

export default EmailsForm
