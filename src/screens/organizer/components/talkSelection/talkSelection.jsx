import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Badge from 'components/badge'

const TalkSelection = ({
  onChange, state, emailStatus, isDeliberationDone,
}) => (
  <Fragment>
    <div>
      {isDeliberationDone && state === 'accepted' && (
        <Badge success outline>
          Accepted proposal
        </Badge>
      )}
      {isDeliberationDone && state === 'rejected' && (
        <Badge error outline>
          Rejected proposal
        </Badge>
      )}
      {isDeliberationDone && state === 'confirmed' && <Badge success>Confirmed by speaker</Badge>}
      {isDeliberationDone && state === 'declined' && <Badge error>Declined by speaker</Badge>}
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
      {emailStatus && emailStatus === 'delivered' && (<Badge success outline>Delivered</Badge>)}
    </div>
    <div>
      {emailStatus && emailStatus === 'sending' && (<Badge warning outline>Sending...</Badge>)}
    </div>
    <div>
      {emailStatus && emailStatus === 'sent' && (<Badge warning outline>Sent</Badge>)}
    </div>
    <div>
      { (!emailStatus || emailStatus === 'none') && (<Badge outline>No email</Badge>)}
    </div>
  </Fragment>
)

TalkSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.string,
  emailStatus: PropTypes.string,
  isDeliberationDone: PropTypes.bool.isRequired,
}

TalkSelection.defaultProps = {
  state: undefined,
  emailStatus: 'none',
}

export default TalkSelection
