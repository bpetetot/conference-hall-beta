import React from 'react'
import PropTypes from 'prop-types'

const TalkSelection = ({ onChange, defaultValue }) => (
  <select
    id="ratings"
    onChange={onChange}
    onClick={e => e.stopPropagation()}
    defaultValue={defaultValue}
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
}

TalkSelection.defaultProps = {
  defaultValue: undefined,
}

export default TalkSelection
