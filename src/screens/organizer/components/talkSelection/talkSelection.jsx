import React from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'

const TalkSelection = ({ onChange, defaultValue, disabled }) => {
  if (defaultValue === 'confirmed') {
    return <Badge success>Confirmed</Badge>
  }

  if (defaultValue === 'declined') {
    return <Badge error>Declined</Badge>
  }

  return (
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
      <option key="rejected" value="rejected">
        Rejected
      </option>
    </select>
  )
}

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
