import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import styles from './deliberation.module.css'

const DeliberationForm = ({
  deliberationActive,
  onActiveDeliberation,
  displayOrganizersRatings,
  onDisplayOrganizersRatings,
  sendDeliberationEmails,
  onSendDeliberationEmails,
}) => (
  <div className={cn(styles.form, 'card')}>
    <Label
      name="displayOrganizersRatings"
      label="Display organizers ratings"
      classNameInput={styles.label}
    >
      <Toggle
        name="displayOrganizersRatings"
        value={displayOrganizersRatings}
        onChange={onDisplayOrganizersRatings}
      />
      <span className={styles.description}>All organizers can see ratings of others.</span>
    </Label>
    <Label name="deliberationActive" label="Enable Deliberation" classNameInput={styles.label}>
      <Toggle
        name="deliberationActive"
        value={deliberationActive}
        onChange={onActiveDeliberation}
      />
      <span className={styles.description}>
        Active deliberation to accept, reject or flag as backup proposals.
      </span>
    </Label>
    {deliberationActive && (
      <Label
        name="sendDeliberationEmails"
        label="Deliberation emails auto."
        classNameInput={styles.label}
      >
        <Toggle
          name="sendDeliberationEmails"
          value={sendDeliberationEmails}
          onChange={onSendDeliberationEmails}
        />
        <span className={styles.description}>
          Automatically send an email to speakers when a proposal is marked as accepted or
          rejected.
        </span>
      </Label>
    )}
  </div>
)

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  onActiveDeliberation: PropTypes.func.isRequired,
  displayOrganizersRatings: PropTypes.bool,
  onDisplayOrganizersRatings: PropTypes.func.isRequired,
  sendDeliberationEmails: PropTypes.bool,
  onSendDeliberationEmails: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  displayOrganizersRatings: false,
  deliberationActive: false,
  sendDeliberationEmails: false,
}

export default DeliberationForm
