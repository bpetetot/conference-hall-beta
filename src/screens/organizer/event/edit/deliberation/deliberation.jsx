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
}) => (
  <div className={cn(styles.form, 'card')}>
    <Label
      name="displayOrganizersRatings"
      label="Display organizers ratings"
      classNameInput={styles.label}
    >
      <Toggle
        name="displayOrganizersRatings"
        checked={displayOrganizersRatings}
        onChange={onDisplayOrganizersRatings}
      />
      <span className={styles.description}>All organizers can see ratings of others.</span>
    </Label>
    <Label name="deliberationActive" label="Enable Deliberation" classNameInput={styles.label}>
      <Toggle
        name="deliberationActive"
        checked={deliberationActive}
        onChange={onActiveDeliberation}
      />
      <span className={styles.description}>
        Active deliberation to mark proposals to accepted or rejected, and send confirmation emails
        to speakers.
      </span>
    </Label>
  </div>
)

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  onActiveDeliberation: PropTypes.func.isRequired,
  displayOrganizersRatings: PropTypes.bool,
  onDisplayOrganizersRatings: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  displayOrganizersRatings: false,
  deliberationActive: false,
}

export default DeliberationForm
