import React from 'react'
import PropTypes from 'prop-types'

const TalkSelection = ({ onChange, defaultValue, disabled }) => (
  <select
    id="ratings"
    onChange={onChange}
    onClick={e => e.stopPropagation()}
    defaultValue={defaultValue}
    disabled={disabled}
  >
    <option key="submitted" value="submitted">
      Deliberate...
    </option>
    <option key="accepted" value="accepted">
      Accepted
    </option>
    <option key="backup" value="backup">
      Backup
    </option>
    <option key="rejected" value="rejected">
      Rejected
    </option>
  </select>
)

TalkSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
}

TalkSelection.defaultProps = {
  defaultValue: undefined,
  disabled: false,
}

export default TalkSelection
