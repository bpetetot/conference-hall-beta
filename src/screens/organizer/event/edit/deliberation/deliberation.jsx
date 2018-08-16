import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import './deliberation.css'

const DeliberationForm = ({
  deliberationActive,
  onActiveDeliberation,
  displayOrganizersRatings,
  onDisplayOrganizersRatings,
  sendToAccepted,
}) => (
  <div className="deliberation-form card">
    <Label name="displayOrganizersRatings" label="Display organizers ratings">
      <Toggle
        name="displayOrganizersRatings"
        value={displayOrganizersRatings}
        onChange={onDisplayOrganizersRatings}
      />
    </Label>
    <Label name="deliberationActive" label="Enable Deliberation">
      <Toggle
        name="deliberationActive"
        value={deliberationActive}
        onChange={onActiveDeliberation}
      />
    </Label>
    <button type="button" onClick={sendToAccepted} className="btn">
      Send email to accepted
    </button>
  </div>
)

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  onActiveDeliberation: PropTypes.func.isRequired,
  displayOrganizersRatings: PropTypes.bool,
  onDisplayOrganizersRatings: PropTypes.func.isRequired,
  sendToAccepted: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  displayOrganizersRatings: false,
  deliberationActive: false,
}

export default DeliberationForm
