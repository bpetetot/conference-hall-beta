import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import './deliberation.css'

const DeliberationForm = ({ deliberationActive, onActiveDeliberation }) => (
  <div className="deliberation-form card">
    <Label name="deliberationActive" label="Enable Deliberation">
      <Toggle
        name="deliberationActive"
        value={deliberationActive}
        onChange={onActiveDeliberation}
      />
    </Label>
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
