import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'
import IconLabel from 'components/iconLabel/iconLabel'

import styles from './deliberation.module.css'

const DeliberationForm = ({
  deliberationActive,
  onActiveDeliberation,
  displayOrganizersRatings,
  onDisplayOrganizersRatings,
  contact,
  sendEmailsTo,
  onChangeSendTo,
  emails,
  onChangeEmails,
}) => {
  // eslint-disable-next-line max-len
  const disabledEmails = !sendEmailsTo.organizers && (!sendEmailsTo.contact || (sendEmailsTo.contact && !contact))

  return (
    <div className={cn(styles.form, 'card')}>
      <Label
        name="deliberationActive"
        label="Enable Deliberation"
        description="Active deliberation to mark proposals to accepted or rejected, and send confirmation emails to speakers."
        classNameInput={styles.label}
        right
      >
        <Toggle
          name="deliberationActive"
          checked={deliberationActive}
          onChange={onActiveDeliberation}
        />
      </Label>

      <Label
        name="displayOrganizersRatings"
        label="Display organizers ratings"
        description="All organizers can see ratings of others."
        classNameInput={styles.label}
        right
      >
        <Toggle
          name="displayOrganizersRatings"
          checked={displayOrganizersRatings}
          onChange={onDisplayOrganizersRatings}
        />
      </Label>

      <h2>Email notifications</h2>

      {disabledEmails && (
        <IconLabel
          icon="fa fa-exclamation-circle"
          label="No destination email defined, no email will be received."
          className={styles.error}
        />
      )}

      <p>Configure emails recipients:</p>
      <Checkbox
        name="contact"
        label="Send to the event contact email"
        info={
          contact ? (
            'Sent emails will have the event contact email as CC.'
          ) : (
            <IconLabel
              icon="fa fa-exclamation-circle"
              label="No contact email defined for the event."
            />
          )
        }
        onChange={onChangeSendTo}
        value={sendEmailsTo.contact}
        disabled={!contact}
      />
      <Checkbox
        name="organizers"
        label="Send to organizer's emails"
        info="Sent emails will have organizer's email as BCC."
        onChange={onChangeSendTo}
        value={sendEmailsTo.organizers}
      />

      <p>Configure which email you want to receive:</p>
      <Checkbox
        name="submitted"
        label="Submitted proposals"
        info="Receive an email when a speaker submit a talk."
        onChange={onChangeEmails}
        value={emails.submitted}
        disabled={disabledEmails}
      />
      <Checkbox
        name="accepted"
        label="Accepted proposals"
        info="Have a copy of acceptation emails sent to speakers."
        onChange={onChangeEmails}
        value={emails.accepted}
        disabled={disabledEmails}
      />
      <Checkbox
        name="rejected"
        label="Rejected proposals"
        info="Have a copy of rejection emails sent to speakers."
        onChange={onChangeEmails}
        value={emails.rejected}
        disabled={disabledEmails}
      />
      <Checkbox
        name="confirmed"
        label="Confirmed proposals"
        info="Receive an email when a speaker confirm a talk."
        onChange={onChangeEmails}
        value={emails.confirmed}
        disabled={disabledEmails}
      />
      <Checkbox
        name="declined"
        label="Declined proposals"
        info="Receive an email when a speaker decline a talk."
        onChange={onChangeEmails}
        value={emails.declined}
        disabled={disabledEmails}
      />
    </div>
  )
}

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  onActiveDeliberation: PropTypes.func.isRequired,
  displayOrganizersRatings: PropTypes.bool,
  onDisplayOrganizersRatings: PropTypes.func.isRequired,
  contact: PropTypes.string,
  sendEmailsTo: PropTypes.object,
  onChangeSendTo: PropTypes.func.isRequired,
  emails: PropTypes.object,
  onChangeEmails: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  displayOrganizersRatings: false,
  deliberationActive: false,
  contact: undefined,
  sendEmailsTo: {},
  emails: {},
}

export default DeliberationForm
