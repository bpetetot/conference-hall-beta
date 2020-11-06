import React from 'react'
import get from 'lodash/get'
import cn from 'classnames'
import { useParams } from 'react-router-dom'

import { useEvent } from 'features/event/useEvents'
import { useEventSettings, useSaveEventSettings } from 'features/event/useEventSettings'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'
import IconLabel from 'components/iconLabel/iconLabel'

import styles from './deliberation.module.css'

const DeliberationForm = () => {
  const { eventId } = useParams()
  const { data: event } = useEvent(eventId)
  const { data: settings } = useEventSettings(eventId)
  const [saveSettings] = useSaveEventSettings(eventId)

  const blindRating = get(settings, 'deliberation.blindRating')
  const deliberationEnabled = get(settings, 'deliberation.enabled')
  const displayRatings = get(settings, 'deliberation.displayRatings')
  const hideRatings = get(settings, 'deliberation.hideRatings')
  const recipients = get(settings, 'notifications.recipients', {})
  const emails = get(settings, 'notifications.emails', {})

  const onToggleDeliberation = (checked) => saveSettings({ 'deliberation.enabled': checked })
  const onToggleBlindRating = (checked) => saveSettings({ 'deliberation.blindRating': checked })
  const onToggleRatings = (checked) => saveSettings({ 'deliberation.displayRatings': checked })
  const onToggleHideRatings = (checked) => saveSettings({ 'deliberation.hideRatings': checked })
  const onChangeRecipients = (e) =>
    saveSettings({ [`notifications.recipients.${e.target.name}`]: e.target.checked })
  const onChangeNotifiedEmails = (e) =>
    saveSettings({ [`notifications.emails.${e.target.name}`]: e.target.checked })

  const disabledEmails =
    !recipients.organizers && (!recipients.contact || (recipients.contact && !event.contact))

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
          onChange={onToggleRatings}
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
            event.contact ? (
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
          disabled={!event.contact}
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

export default DeliberationForm
