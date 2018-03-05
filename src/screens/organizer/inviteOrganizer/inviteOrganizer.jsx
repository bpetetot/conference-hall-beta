import React from 'react'
import PropTypes from 'prop-types'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import AvatarLabel from 'components/avatar/avatarLabel'
import './inviteOrganizer.css'

const InviteOrganizer = ({
  displayName, photoURL, name, join, cancel,
}) => (
  <div className="invite-organizer">
    <Titlebar icon="fa fa-envelope-open" title="You're invite to join an organization">
      <button onClick={cancel} className="btn btn-default">
        Cancel
      </button>
    </Titlebar>
    <div className="card">
      <AvatarLabel displayName={displayName} photoURL={photoURL} suffix="invites you to join the organization :" className="invited-by" />
      <h2><IconLabel icon="fa fa-users" label={name} /></h2>
      <p>You&apos;re will be able to update it and invite users.</p>
      <button onClick={join} className="btn btn-primary invite-join-btn">
        Join organization
      </button>
    </div>
  </div>
)

InviteOrganizer.propTypes = {
  displayName: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  name: PropTypes.string,
  join: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
}

InviteOrganizer.defaultProps = {
  name: undefined,
}

export default InviteOrganizer
