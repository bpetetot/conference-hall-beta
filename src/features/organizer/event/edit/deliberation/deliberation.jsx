import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'
import IconLabel from 'components/iconLabel/iconLabel'

import styles from './deliberation.module.css'

const DeliberationForm = ({
  blindRating,
  deliberationEnabled,
  displayRatings,
  hideRatings,
  contact,
  recipients,
  emails,
  onToggleBlindRating,
  onToggleDeliberation,
  onToggleOrganizersRatings,
  onToggleHideRatings,
  onChangeRecipients,
  onChangeNotifiedEmails,
}) => {
  // eslint-disable-next-line max-len
  const disabledEmails =
    !recipients.organizers && (!recipients.contact || (recipients.contact && !contact))

  return (
    <div className={cn(styles.form, 'card')}>
      <Label
        name="enabled"
        label="Enable Deliberation"
        description="Active deliberation to mark proposals to accepted or rejected, and send confirmation emails to speakers."
        classNameInput={styles.label}
        right
      >
        <Toggle name="enabled" checked={deliberationEnabled} onChange={onToggleDeliberation} />
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
          checked={displayRatings}
          onChange={onToggleOrganizersRatings}
        />
      </Label>

      <Label
        name="hideRatings"
        label="Hide ratings from proposal list"
        classNameInput={styles.label}
        right
      >
        <Toggle name="hideRatings" checked={hideRatings} onChange={onToggleHideRatings} />
      </Label>

      <Label
        name="blindRating"
        label="Hide speakers from proposal page"
        classNameInput={styles.label}
        right
      >
        <Toggle name="blindRating" checked={blindRating} onChange={onToggleBlindRating} />
      </Label>

      <h3>Email notifications</h3>

      {disabledEmails && (
        <IconLabel
          icon="fa fa-exclamation-circle"
          label="No destination email defined, no email will be received."
          className={styles.error}
        />
      )}

      <h4>Configure emails recipients:</h4>
      <div className={styles.checkboxes}>
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
          onChange={onChangeRecipients}
          value={recipients.contact}
          disabled={!contact}
        />
        <Checkbox
          name="organizers"
          label="Send to organizer's emails"
          info="Sent emails will have organizer's email as BCC."
          onChange={onChangeRecipients}
          value={recipients.organizers}
        />
      </div>

      <h4>Configure which email you want to receive:</h4>
      <div className={styles.checkboxes}>
        <Checkbox
          name="submitted"
          label="Submitted proposals"
          info="Receive an email when a speaker submit a talk."
          onChange={onChangeNotifiedEmails}
          value={emails.submitted}
          disabled={disabledEmails}
        />
        <Checkbox
          name="accepted"
          label="Accepted proposals"
          info="Have a copy of acceptation emails sent to speakers."
          onChange={onChangeNotifiedEmails}
          value={emails.accepted}
          disabled={disabledEmails}
        />
        <Checkbox
          name="rejected"
          label="Rejected proposals"
          info="Have a copy of rejection emails sent to speakers."
          onChange={onChangeNotifiedEmails}
          value={emails.rejected}
          disabled={disabledEmails}
        />
        <Checkbox
          name="confirmed"
          label="Confirmed proposals"
          info="Receive an email when a speaker confirm a talk."
          onChange={onChangeNotifiedEmails}
          value={emails.confirmed}
          disabled={disabledEmails}
        />
        <Checkbox
          name="declined"
          label="Declined proposals"
          info="Receive an email when a speaker decline a talk."
          onChange={onChangeNotifiedEmails}
          value={emails.declined}
          disabled={disabledEmails}
        />
      </div>
    </div>
  )
}

DeliberationForm.propTypes = {
  blindRating: PropTypes.bool,
  deliberationEnabled: PropTypes.bool,
  displayRatings: PropTypes.bool,
  hideRatings: PropTypes.bool,
  contact: PropTypes.string,
  recipients: PropTypes.object,
  emails: PropTypes.object,
  onToggleDeliberation: PropTypes.func.isRequired,
  onToggleOrganizersRatings: PropTypes.func.isRequired,
  onToggleHideRatings: PropTypes.func.isRequired,
  onToggleBlindRating: PropTypes.func.isRequired,
  onChangeRecipients: PropTypes.func.isRequired,
  onChangeNotifiedEmails: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  blindRating: false,
  deliberationEnabled: false,
  displayRatings: false,
  hideRatings: false,
  contact: undefined,
  recipients: {},
  emails: {},
}

export default DeliberationForm
