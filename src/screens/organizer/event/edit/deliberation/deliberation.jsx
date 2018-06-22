import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import './deliberation.css'

const DeliberationForm = ({ deliberationActive, onActiveDeliberation, sendToAccepted }) => (
  <div className="deliberation-form card">
    <Label name="deliberationActive" label="Enable Deliberation">
      <Toggle
        name="deliberationActive"
        value={deliberationActive}
        onChange={onActiveDeliberation}
      />
    </Label>
    <button onClick={sendToAccepted} className="btn">
      Send email to accepted
    </button>
  </div>
)

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  onActiveDeliberation: PropTypes.func.isRequired,
}

DeliberationForm.defaultProps = {
  deliberationActive: false,
}

export default DeliberationForm
