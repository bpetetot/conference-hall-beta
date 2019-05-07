import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Badge from 'components/badge'

const TalkSelection = ({
  onChange, state, isDeliberationDone,
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
          Accept proposal and send email
        </option>
        <option key="rejected" value="rejected">
          Reject proposal and send email
        </option>
      </select>
    )}
  </Fragment>
)

TalkSelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  state: PropTypes.string,
  isDeliberationDone: PropTypes.bool.isRequired,
}

TalkSelection.defaultProps = {
  state: undefined,
}

export default TalkSelection
