import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'

const TalkSelection = ({
  onChange, state, emailDelivered, emailSent, isDeliberationDone,
}) => (
  <Fragment>
    <div>
      {state === 'accepted' && (
        <Badge success outline>
          Accepted proposal
        </Badge>
      )}
      {state === 'rejected' && (
        <Badge error outline>
          Rejected proposal
        </Badge>
      )}
      {state === 'confirmed' && <Badge success>Confirmed by speaker</Badge>}
      {state === 'declined' && <Badge error>Declined by speaker</Badge>}
    </div>
    {!isDeliberationDone && (
      <select
        onChange={onChange}
        onClick={e => e.stopPropagation()}
        defaultValue={state}
      >
        <option key="submitted" value="submitted">
          Deliberate...
        </option>
        <option key="accepted" value="accepted">
          Accept proposal
        </option>
        <option key="rejected" value="rejected">
          Reject proposal
        </option>
      </select>
    )}
    <div style={{ marginLeft: '1em' }}>
      {emailSent && emailDelivered && (<Badge success outline>Delivered</Badge>)}
    </div>
    <div>
      {emailSent && !emailDelivered && (<Badge warning outline>Sending...</Badge>)}
    </div>
    <div>
      {!emailSent && !emailDelivered && (<Badge outline>No email</Badge>)}
    </div>
  </Fragment>
)

TalkSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.string,
  emailDelivered: PropTypes.bool,
  emailSent: PropTypes.bool,
  isDeliberationDone: PropTypes.bool.isRequired,
}

TalkSelection.defaultProps = {
  state: undefined,
  emailDelivered: false,
  emailSent: false,
}

export default TalkSelection
